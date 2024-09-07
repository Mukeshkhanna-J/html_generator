import express from "express"
import bodyParser from "body-parser"
import { GoogleGenerativeAI } from "@google/generative-ai"
import env from "dotenv"

const app = express();
const port = 3000;
const body = app.use(bodyParser.urlencoded({extended:true}));
env.config();
const API_KEY = process.env.G_API_KEY;
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";


app.post("/generate",async(req,res)=>{

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Using the theme: "${req.body.theme}" and content: "${req.body.content}", generate only the HTML code. Do not include any comments, explanations, or additional text. Strictly return only the HTML code without any comments or additional content.`;

    const result = await model.generateContent(prompt);
    const code = result.response.text();

    console.log(code);
    res.send(code);
})

app.listen(port,()=>{
    console.log("server is running");
})