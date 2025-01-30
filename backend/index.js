import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fileUpload from 'express-fileupload';
import OpenAI from 'openai';
dotenv.config(); // Load environment variables

const app = express(); // Express app
const port = process.env.BACKEND_SERVER_PORT_NO || 4000; // Backend server port number

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.set("view engine", "ejs");
app.use(express.static("public"));

// Prompts
const prompt1 = "What are the keywords in this job description? Rank the keyword from greatest importance to least importance according to job description:";
const prompt2 = "create a resume with the following information:";
const prompt3 = "Update the resume to include bullet pointed achievement each. Include metrics and quantifiable data. Each section should include at least one keyword from resume. Here is the list of keywords to use:";
const prompt4 = "Prepare 30 interview questions and answers for every question for the following resume:";
let resumeKeywords = "";
let aiProcessResult = "";
let interviewQuestions = "";
// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
const openai = new OpenAI();//creating openAI instance
//******************************* */ Gemini AI call function*****************************************/
async function genAICall(userInput, promptData) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const prompt = promptData + " " + userInput;

        const result = await model.generateContent(prompt);
        return result.response.text(); // Return response data
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        throw new Error("Failed to process the request");
    }
}
// ******************************* */ Gemini AI call function END*****************************************/





//******************************* */ OpenAi Chat GPT call function*****************************************/


// async function genAICall(userInput, promptData) {
//     try {
//         const messages = [
//             { role: "system", content: promptData },
//             { role: "user", content: userInput }
//         ];

//         const chat = await openai.chat.completions.create({
//             model: 'gpt-4o',
//             messages: messages,
            
//         });

//         return chat.choices[0].message.content; // Return the response text
//     } catch (error) {
//         console.error("Error fetching data from OpenAI:", error);
//         throw new Error("Failed to process the request");
//     }
// }




//******************************* */ OpenAi Chat GPT call function*****************************************/



// Route to check server status
app.get('/', (req, res) => {
    res.send('<h1>Backend Server is running!!!!</h1>');
});

// Route to handle keyword extraction
app.post('/process', async (req, res) => {
    try {
        const processResult = await genAICall(req.body.data, prompt1);
        resumeKeywords = processResult; // Store keywords for later use
        res.json(processResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Route to handle resume data processing
app.post('/resumeData', async (req, res) => {
    try {
        const createResumeData = await genAICall(req.body.data, prompt2);
        aiProcessResult = await genAICall("keywords: " + resumeKeywords + " Resume: " + createResumeData, prompt3);
        // interviewQuestions = await genAICall(aiProcessResult, prompt4);
        // res.render('aiResponseFile', { data: aiProcessResult });
        // console.log(aiProcessResult);
        res.json({ status:"success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Route to display AI-generated resume response
// app.get('/aiResume', (req, res) => {
//     // try {
//     //     res.render('aiResponseFile', { data: aiProcessResult });
//     //     console.log(aiProcessResult);
//     // } catch (error) {
//     //     console.error(" Ejs File Rendering error:", error);
//     //     res.status(500).send("Internal Server Error: Could not load the AI-generated resume.");
//     // }
// res.send(aiProcessResult);
// });



app.get('/aiResume', (req, res) => {
    try {
        res.json({ data: aiProcessResult, questions: interviewQuestions });
        // console.log(aiProcessResult);
        console.log("Sent AI Process Result to frontend:");
    } catch (error) {
        console.error("Error sending AI Process Result:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
