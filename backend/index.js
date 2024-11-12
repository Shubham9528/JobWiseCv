import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fileUpload from 'express-fileupload';

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
const prompt1 = process.env.PROMPT1
const prompt2 = process.env.PROMPT2
const prompt3 = process.env.PROMPT3

let resumeKeywords = "";
let aiProcessResult = "AI in progress..., Please refresh in a moment.";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

// Gemini AI call function
async function genAICall(userInput, promptData) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", timeout: 10000 });
        const prompt = promptData + ":" + userInput;

        const result = await model.generateContent(prompt);
        return result.response.text(); // Return response data
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        throw new Error("Failed to process the request");
    }
}

// Route to check server status
app.get('/', (req, res) => {
    res.send('<h1>Backend Server is running!</h1>');
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
        
        res.render('aiResponseFile', { data: aiProcessResult });
        // console.log(aiProcessResult);
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
        res.json({ data: aiProcessResult });
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
