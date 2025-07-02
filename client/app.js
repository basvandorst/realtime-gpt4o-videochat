import { RealtimeClient } from '@openai/realtime-api-beta';
import { WavStreamPlayer } from './wav/wav_stream_player.js';
import { WavRecorder } from './wav/wav_recorder.js';
import { OPENAI_INSTRUCTIONS, OPENAI_KEY } from '../config.js';

// No fluff version of this React app: https://github.com/openai/openai-realtime-console

class DemoApp {

  constructor() {
    this.isConnected = false;
    this.cameraStream = null;
    this.currentFacingMode = 'user';
    this.conversation = [];
    this.debug = [];

    this.wavRecorder = new WavRecorder({ sampleRate: 24000 });
    this.wavStreamPlayer = new WavStreamPlayer({ sampleRate: 24000 });
    this.client = new RealtimeClient({
      apiKey: OPENAI_KEY,
      dangerouslyAllowAPIKeyInBrowser: true
    });
  }

  async setupAppEvents() {
    const powerBtn = document.getElementById('powerBtn');
    powerBtn.addEventListener('click', async () => {
      if(!this.isConnected) {
        powerBtn.classList.add('active');
        await this.connect()
      } else {
        powerBtn.classList.remove('active');
        await this.disconnect()
      }
    });

    const pushToTalkBtn = document.getElementById('pushToTalkBtn');

    ['mousedown', 'touchstart'].forEach(event => pushToTalkBtn.addEventListener(event, (e) => {
      pushToTalkBtn.classList.add('active');
      e?.preventDefault();
      this.startRecording();
    }));
    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(event => pushToTalkBtn.addEventListener(event, (e) => {
      pushToTalkBtn.classList.remove('active');
      e?.preventDefault();
      this.stopRecording();
    }));

    const webcamToggleBtn = document.getElementById('cameraToggleBtn');
    webcamToggleBtn.addEventListener('touchend', () => {
      this.currentFacingMode = this.currentFacingMode === 'user' ? 'environment' : 'user';
      this.initializeCamera(this.currentFacingMode);
    });
    await this.initializeCamera('environment');
  }

  async initializeCamera(facingMode) {
    try {
      try {
        this.cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: facingMode } }
        });
      } catch {
        this.cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode }
        });
      }

      const videoElement = document.getElementById('webcamVideo');
      if (videoElement) {
        videoElement.srcObject = this.cameraStream;
      }
    } catch (error) {
      console.error('Camera error:', error);
      alert(error);
    }
  }

  async connect() {
    this.isConnected = true;

    await this.wavRecorder.begin();
    await this.wavStreamPlayer.connect();

    await this.client.connect();
    this.client.sendUserMessageContent([
      {
        type: `input_text`,
        text: `Hello, what can i do for you?`
      }
    ]);
    await this.client.updateSession({ 
        instructions: OPENAI_INSTRUCTIONS,
        input_audio_transcription: { model: 'whisper-1' },
        voice: 'shimmer'
    });

    // Voice control tools
    this.client.addTool({
        'name': 'change_voice',
        'description': 'Changes the AI voice to a different option',
        'parameters': {
            'type': 'object',
            'properties': {
                'voice': {
                    'type': 'string',
                    'enum': ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'],
                    'description': 'The voice to switch to'
                }
            },
            'required': ['voice']
        }
    }, async ({ voice }) => {
        await this.client.updateSession({ voice });
        return { 
            success: true,
            message: `Voice changed to ${voice}`,
            current_voice: voice
        };
    });

    this.client.addTool({
        'name': 'get_current_voice',
        'description': 'Returns the currently active voice',
        'parameters': {
            'type': 'object',
            'properties': {}
        }
    }, async () => {
        const session = await this.client.getSession();
        return { 
            current_voice: session.voice || 'default'
        };
    });

    // Camera reference tool
    this.client.addTool({
        'name': 'detect_reference_question',
        'description': 'Returns the answers to context-dependent questions that refer to previously mentioned or visually present subjects (e.g., \'What is this?\', \'How do I solve this?\')',
        'parameters': {
          'type': 'object',
          'properties': {
            'question': {
              'type': 'string',
              'description': 'The question to analyze for context-dependent references'
            }
          },
          'required': ['question']
        }
      },
      async ({ question }) => {
        try {
          this.setSnapshotIndicator();

          const stream = this.cameraStream.clone();
          const video = document.createElement('video');
          video.srcObject = stream;
          await video.play();

          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext('2d');
          context?.drawImage(video, 0, 0);

          stream.getTracks().forEach(track => track.stop());

          const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

          const response = await fetch('/analyze-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image: base64Image,
              question: question
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          return result;

        } catch (error) {
          alert(error);
          return {
            status: 'error',
            message: `Failed to analyze photo: ${error}`
          };
        }
      });
  }

  async startRecording() {
    const trackSampleOffset = this.wavStreamPlayer.interrupt();
    if (trackSampleOffset?.trackId) {
      const { trackId, offset } = trackSampleOffset;
      this.client.cancelResponse(trackId, offset);
    }

    await this.wavRecorder.record((data) =>
      this.client.appendInputAudio(data.mono)
    );
  }

  async stopRecording() {
    await this.wavRecorder.pause();
    this.client.createResponse();
  }

  async disconnect() {
    this.isConnected = false;
    this.debug = [];
    this.conversation = [];

    this.client.disconnect();
    await this.wavRecorder.end();
    this.wavStreamPlayer.interrupt();
  }

  setupConversationEvents() {
    this.client.on('realtime.event', (event) => {
      this.debug.push(event);
      this.updateEventsDisplay();
    });
    this.client.on('conversation.updated', async ({ item, delta }) => {
      if (delta?.audio) {
        this.wavStreamPlayer.add16BitPCM(delta.audio, item.id);
      }
      if (item.status === 'completed' && item.formatted.audio?.length) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000
        );
        item.formatted.file = wavFile;
      }
      this.conversation = this.client.conversation.getItems();
      this.updateConversationDisplay();
    });

    this.client.on('conversation.interrupted', async () => {
      const trackSampleOffset = await this.wavStreamPlayer.interrupt();
      if (trackSampleOffset?.trackId) {
        const { trackId, offset } = trackSampleOffset;
        await this.client.cancelResponse(trackId, offset);
      }
    });
  }

  updateEventsDisplay() {
    const eventsLog = document.getElementById('eventsLog');
    const eventText = this.debug
      .map(event => `${new Date(event.time).toISOString()} - ${event.event.type}`)
      .join('\n');
    eventsLog.textContent = eventText;
    eventsLog.scrollTop = eventsLog.scrollHeight;
  }

  updateConversationDisplay() {
    const conversationLog = document.getElementById('conversationLog');
    const conversationText = this.conversation
      .map(item => {
        const role = item.role || item.type;
        const content = item.formatted.transcript || item.formatted.text || '(pending)';
        return `${role}: ${content}`;
      })
      .join('\n\n');
    conversationLog.textContent = conversationText;
    conversationLog.scrollTop = conversationLog.scrollHeight;
  }

  setSnapshotIndicator() {
    const element = document.getElementById('webcamVideo');
    element.classList.add('highlight');

    setTimeout(() => {
      element.classList.remove('highlight');
    }, 1000);
  }

}

document.addEventListener('DOMContentLoaded', async () => {
  const app = new DemoApp();
  app.setupConversationEvents();
  await app.setupAppEvents();
});