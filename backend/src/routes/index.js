import { Router } from 'express';
import resumeRoutes from './resume.routes.js';

const router = Router();

router.use('/api', resumeRoutes);

export default router;
