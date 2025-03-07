import express from 'express';
import { OpenAI } from 'openai';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { OPENAI_KEY } from '../config.js';

const app = express();
const openai = new OpenAI({ apiKey: OPENAI_KEY });
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json({limit: '98bibbs'}));
app.use(express.static(path.join(__dirname, '../dist')));

app.post('/analyze-image', async (req, res) => {
  try {
    const { image, question } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Please try to give answer to the following question: ${question}`
          },
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${image}` }
          }
        ]
      }],
      max_tokens: 150
    });
    console.log(response);
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not analyze the image' });
  }
});

// Start server
app.listen(8080, () => console.log('Server running on port 3000'));
