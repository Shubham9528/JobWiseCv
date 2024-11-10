import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fileUpload from 'express-fileupload';
const app = express(); // Express app
dotenv.config();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload()); 
app.set("view engine", "ejs");
app.use(express.static("public"));






//Prompts

const prompt1="What are the keywords in this job description? Rank the keyword from greatest importance to least importance according to job description provide only keywords:";

const prompt2="create a resume with the  following information:";

const prompt3="Update the resume to include bullet pointed acheivement each. Include metrics and quantifiable data. Each section should include at least one keyword from resume. Here is the list of keywords to use:"





 // Load environment variables
const port = process.env.BACKEND_SERVER_PORT_NO; // Backend server port number
const resumeKeywords ="";
let aiProcessResult="AI is progress...., Please refresh in a moment.";


//settuping chat gpt
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,  // Ensure your API key is set up correctly in the .env file
// });


const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);




// Gemini AI call function
async function genAICall(userInput,promptData) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = promptData + "" + userInput;

        
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text(); // Return response data
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        throw new Error("Failed to process the request");
    }
}

// Route to check server statusgpt
app.get('/', (req, res) => {
    res.send('<h1>Backend Server is running!</h1>');
});

// Route to handle the POST request and process user input
app.post('/process', async (req, res) => {
    try {
        // console.log("Received data:", req.body.data); // Log the user input
        const processResult = await genAICall(req.body.data,prompt1); // Call GPT API
        
        res.json(processResult); // Send the response to the client
        resumeKeywords=processResult;
    } catch (error) {
        // return res.status(500).json({ error: error.message }); // Send error response
    }
});


app.post('/resumeData', async (req, res) => {
    try {    
        // console.log("Received data:", req.body.data); // Log the user input
        const createResumeData=await genAICall(req.body.data,prompt2);
        aiProcessResult = await genAICall("keywords:"+":"+resumeKeywords+"Resume:"+createResumeData,prompt3); // Call genAI
        // console.log(processResult);
        //  res.json({success:true,data:processResult}); // Send the response to the client
        res.render('aiResponseFile',{data:aiProcessResult});
        console.log(aiProcessResult);
        
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error response
    }
});

app.get('/aiResume',  (req, res) => {
    if (!aiProcessResult) {
        // res.send("Processing... Please refresh in a moment.");
    } else {
        res.render('aiResponseFile', { data: aiProcessResult });
    }
});


// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
