import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './src/routes/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.BACKEND_SERVER_PORT_NO || 4000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://job-wise-cv-cxtd.vercel.app/',
    'http://localhost:4000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
