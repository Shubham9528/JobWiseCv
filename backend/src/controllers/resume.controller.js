import aiService from '../services/ai.service.js';

export const processJobDescription = async (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || data.length < 20) {
      return res.status(400).json({ error: 'Job description too short' });
    }

    const keywords = await aiService.extractKeywords(data);
    
    // Store in memory (replace with database in future)
    global.jobKeywords = keywords;
    global.jobDescription = data;
    
    res.json(keywords);
  } catch (error) {
    console.error('Error processing job description:', error);
    res.status(500).json({ error: 'Failed to process job description' });
  }
};

export const generateResume = async (req, res) => {
  try {
    const { resumeText } = req.body;
    
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    if (!global.jobKeywords) {
      return res.status(400).json({ error: 'No job keywords found. Please submit job description first.' });
    }

    const enhancedResume = await aiService.generateResume(resumeText, global.jobKeywords);
    global.currentResume = enhancedResume;
    
    res.json({ data: enhancedResume });
  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
};

export const enhanceResume = async (req, res) => {
  try {
    const { resume } = req.body;
    
    if (!resume || !global.jobKeywords) {
      return res.status(400).json({ error: 'Resume and keywords required' });
    }

    const enhancedResume = await aiService.enhanceResume(resume, global.jobKeywords);
    global.currentResume = enhancedResume;
    
    res.json({ data: enhancedResume });
  } catch (error) {
    console.error('Error enhancing resume:', error);
    res.status(500).json({ error: 'Failed to enhance resume' });
  }
};

export const generateInterviewQuestions = async (req, res) => {
  try {
    if (!global.currentResume) {
      return res.status(400).json({ error: 'No resume found. Please generate resume first.' });
    }

    const questions = await aiService.generateInterviewQuestions(global.currentResume);
    global.interviewQuestions = questions;
    
    res.json({ data: questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ error: 'Failed to generate interview questions' });
  }
};

export const getAiResume = (req, res) => {
  if (!global.currentResume) {
    return res.status(404).json({ error: 'No resume generated yet' });
  }
  res.json({ data: global.currentResume });
};

export const getInterviewQuestions = (req, res) => {
  if (!global.interviewQuestions) {
    return res.status(404).json({ error: 'No interview questions generated yet' });
  }
  res.json({ data: global.interviewQuestions });
};
