import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import aiConfig from '../config/ai.config.js';

class AIService {
  constructor() {
    this.openai = new OpenAI({ apiKey: aiConfig.openai.apiKey });
    console.log(aiConfig.openai.apiKey);
    this.genAI = new GoogleGenerativeAI(aiConfig.google.apiKey);
  }

  async generateWithOpenAI(prompt, userInput) {
    try {
      const response = await this.openai.chat.completions.create({
        model: aiConfig.openai.model,
        messages: [{ role: 'user', content: `${prompt} ${userInput}` }],
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw error;
    }
  }

  async generateWithGoogle(prompt, userInput) {
    try {
      const model = this.genAI.getGenerativeModel({ model: aiConfig.google.model });
      const result = await model.generateContent(`${prompt} ${userInput}`);
      return result.response.text();
    } catch (error) {
      console.error('Google AI Error:', error);
      throw error;
    }
  }

  async extractKeywords(jobDescription) {
    const prompt = "What are the keywords in this job description? Rank the keyword from greatest importance to least importance according to job description:";
    return await this.generateWithOpenAI(prompt, jobDescription);
  }

  async generateResume(userInfo, keywords) {
    const prompt = "create a resume with the following information:";
    const input = `${userInfo}. Keywords to include: ${keywords}`;
    return await this.generateWithOpenAI(prompt, input);
  }

  async enhanceResume(resume, keywords) {
    const prompt = "Update the resume to include bullet pointed achievement each. Include metrics and quantifiable data. Each section should include at least one keyword from resume. Here is the list of keywords to use:";
    return await this.generateWithOpenAI(prompt, `${resume} Keywords: ${keywords}`);
  }

  async generateInterviewQuestions(resume) {
    const prompt = "Prepare 30 interview questions and answers for every question for the following resume:";
    return await this.generateWithOpenAI(prompt, resume);
  }
}

export default new AIService();
