import { Router } from 'express';
import {
  processJobDescription,
  generateResume,
  enhanceResume,
  generateInterviewQuestions,
  getAiResume,
  getInterviewQuestions
} from '../controllers/resume.controller.js';

const router = Router();

router.post('/process', processJobDescription);
router.post('/generate-resume', generateResume);
router.post('/enhance-resume', enhanceResume);
router.post('/generate-questions', generateInterviewQuestions);
router.get('/ai-resume', getAiResume);
router.get('/interview-questions', getInterviewQuestions);

export default router;
