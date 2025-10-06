# JobWiseCV.ai 📝 - Boost Your ATS Performance 🚀

Welcome to **JobWiseCV.ai**! This web application leverages AI to help users optimize their resumes for ATS (Applicant Tracking System) compatibility. It analyzes job descriptions to extract crucial keywords, automatically adjusts resumes to include relevant achievements, and presents a refined document, enhancing job-seekers' chances of getting noticed by recruiters.

![image](https://github.com/user-attachments/assets/7d873d0f-7ba9-44cd-aee6-59785caf6d5c)
![image](https://github.com/user-attachments/assets/2c47917d-1f3a-4798-812c-97a9975917b4)
![image](https://github.com/user-attachments/assets/beafab4f-5465-4959-b02b-452ac74e0919)
![image](https://github.com/user-attachments/assets/9788f8e5-2e7d-450b-b171-7095913ed934)

# 🔥Result
![image](https://github.com/user-attachments/assets/240dfaa9-98a7-45ff-b555-8f388b6fad9d)



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