import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly apiKey = 'AIzaSyB5sLvbSrK2hTlx1t-EsqXjxyQg99RJKQs';
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  async generateExam(prompt: string): Promise<any> {
    const body = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    };

    const response = await axios.post(`${this.apiUrl}?key=${this.apiKey}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("🚀 ~ AiService ~ generateExam ~ response:", response.data.candidates?.[0]?.content?.parts)

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text;
  }

  async generateText(prompt: string): Promise<string> {
    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const response = await axios.post(`${this.apiUrl}?key=${this.apiKey}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("🚀 ~ AiService ~ generateText ~ text:", text)
    return text;
  }

  
}
