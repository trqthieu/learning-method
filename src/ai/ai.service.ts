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

  async analyzeExamResults(examResults: any[]) {
    const prompt = this.buildPrompt(examResults);

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

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text;
  }

  // private buildPrompt(examResults: any[]): string {
  //   let prompt = 'Please analyze the following student exam results. For each exam, provide strengths, weaknesses, and improvement suggestions based on the student\'s answers.\n\n';

  //   examResults.forEach((result, idx) => {
  //     prompt += `Exam ${idx + 1}:\n`;
  //     prompt += `Title: ${result.exam.title}\n`;
  //     prompt += `Score: ${result.score} / ${result.total} (${result.correctPercentage}%)\n`;
  //     prompt += `Subject: ${result.exam.subject.name}\n`;
  //     prompt += `Learning Method: ${result.exam.method.name}\n`;
  //     prompt += `Incorrectly answered questions:\n`;

  //     const incorrect = result.submittedAnswers.filter(sa => sa.selectedAnswer !== result.exam.content[sa.questionIndex].correct);

  //     if (incorrect.length === 0) {
  //       prompt += '- None, all answers correct.\n';
  //     } else {
  //       incorrect.forEach(sa => {
  //         const q = result.exam.content[sa.questionIndex];
  //         prompt += `- Question: ${q.question}\n`;
  //         prompt += `  Your answer: ${q.answers[sa.selectedAnswer]}\n`;
  //         prompt += `  Correct answer: ${q.answers[q.correct]}\n`;
  //       });
  //     }
  //     prompt += '\n';
  //   });

  //   prompt += 'Provide a detailed evaluation and suggestions for improvement.';

  //   return prompt;
  // }

  private buildPrompt(examResults: any[]): string {
    let prompt = `
  Please help me evaluate the strengths and weaknesses of the student based on the following exam results, along with the learning methods applied. Also, provide suitable improvement suggestions for the student to progress better.
  
  Each exam data includes:
  - Exam title
  - Subject
  - Learning method applied
  - Score (correct answers out of total questions)
  - Details of incorrect answers, including the question text, student's chosen answer, and the correct answer
  
  Please:
  1. Assess the student’s strengths based on the results and learning method.
  2. Point out weaknesses or areas needing improvement.
  3. Suggest actionable improvements or changes in the learning method to help the student improve.
  
  Exam data:
  `;
  
    examResults.forEach((result, idx) => {
      prompt += `\nExam ${idx + 1}:\n`;
      prompt += `- Title: ${result.exam.title}\n`;
      prompt += `- Subject: ${result.exam.subject.name}\n`;
      prompt += `- Learning Method: ${result.exam.method.name}\n`;
      prompt += `- Score: ${result.score} / ${result.total} (${result.correctPercentage}%)\n`;
      prompt += `- Incorrect answers:\n`;
  
      const incorrect = result.submittedAnswers.filter(sa => sa.selectedAnswer !== result.exam.content[sa.questionIndex].correct);
  
      if (incorrect.length === 0) {
        prompt += `  + None\n`;
      } else {
        incorrect.forEach(sa => {
          const q = result.exam.content[sa.questionIndex];
          prompt += `  + Question: ${q.question}\n`;
          prompt += `    - Student's answer: ${q.answers[sa.selectedAnswer]}\n`;
          prompt += `    - Correct answer: ${q.answers[q.correct]}\n`;
        });
      }
    });
  
    prompt += `\nPlease provide detailed and practical feedback with improvement suggestions.`;
  
    return prompt;
  }

  
}
