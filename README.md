# JobWiseCV.ai 📝 - Boost Your ATS Performance 🚀

Welcome to **JobWiseCV.ai**! This web application leverages AI to help users optimize their resumes for ATS (Applicant Tracking System) compatibility. It analyzes job descriptions to extract crucial keywords, automatically adjusts resumes to include relevant achievements, and presents a refined document, enhancing job-seekers' chances of getting noticed by recruiters.

<img width="1027" height="839" alt="image" src="https://github.com/user-attachments/assets/06edde71-6432-4504-8350-49d773e24c12" />

<img width="1896" height="828" alt="image" src="https://github.com/user-attachments/assets/a8a252e4-abbd-423f-81c2-1ded3465c308" />

<img width="1904" height="866" alt="image" src="https://github.com/user-attachments/assets/85961dd9-4151-4003-b58b-20debaadd55c" />
# 🔥Result
<img width="1903" height="923" alt="image" src="https://github.com/user-attachments/assets/cf361388-3881-40e4-96e3-723eee81fe13" />


## Table of Contents 📑
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Industry Best Practices](#industry-best-practices)
- [Future Improvements](#future-improvements)

---

### Features ✨
- **AI-Driven Keyword Extraction**: Extracts the most relevant keywords from job descriptions.
- **Automated Resume Optimization**: Tailors resumes with quantifiable achievements for ATS systems.
- **PDF Resume Upload**: Extracts text from uploaded resumes for AI processing.
- **Real-Time Status Updates**: Shows processing status and feedback to the user.
- **Intuitive User Interface**: User-friendly layout for smooth navigation and interaction.

---

### Tech Stack 🛠️

- **Frontend**: React.js, React Router
- **Backend**: Node.js, Express.js
- **AI Model**: Google Generative AI (Gemini)
- **File Upload**: Express File Upload and PDF text extraction

---

### Setup & Installation ⚙️

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/JobWiseCV.ai.git
   cd JobWiseCV.ai
   ```
2. Install Dependencies:
   ``bash
   npm install
  ``
3. Setup Environment Variables:
   - Create a .env file in the root directory
   - Add the following variables:
   ```bash
   BACKEND_SERVER_PORT_NO=4000
   GENAI_API_KEY=your_google_gen_ai_key
   REACT_APP_BACKEND_PORT=4000
  ``
# JobWiseCV.ai

JobWiseCV.ai is an application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS) by extracting essential keywords from job descriptions using AI. This app features both a backend built with Node.js and Express, and a frontend developed with React.js.

---

## Key Components 🔍

### Backend (Node.js & Express)

#### Express Application Setup

The backend is set up with Node.js and Express to handle HTTP requests. It also uses `dotenv` for environment variable management, `cors` for handling cross-origin requests, and `body-parser` to parse incoming JSON requests.

```javascript
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
```
