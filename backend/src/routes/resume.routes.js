import { Router } from 'express';
import {
  processJobDescription,
  generateResume,
  enhanceResume,
  getAiResume
} from '../controllers/resume.controller.js';

const router = Router();

router.post('/process', processJobDescription);
router.post('/generate-resume', generateResume);
router.post('/enhance-resume', enhanceResume);
router.get('/ai-resume', getAiResume);

export default router;
