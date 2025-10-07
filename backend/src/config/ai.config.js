import dotenv from 'dotenv';
dotenv.config();

// AI service configuration
export const aiConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o-mini',
  },
  google: {
    apiKey: process.env.GENAI_API_KEY,
    model: '	gemini-2.0-flash',
  }
};

export default aiConfig;
