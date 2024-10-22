const express= require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash" });

app.post('/api/chat' , async (req, res) => {
    try{
        const {message} = req.body;
        const result = await model.generateContent(message);
        const response = result.response;
        const text = response.text();
        res.json({ reply: text});
    }catch(error){
        console.error("Google Generative API Error", error);
        res.status(500).json({
            error : "An error Occured while processing your request."
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
});

