import Groq from "groq-sdk/index.mjs";
import { config } from "dotenv";
config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const aiService = async (prompt) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            model: "deepseek-r1-distill-qwen-32b",
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
            ],
        });

        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error("Groq API Error:", error);
        throw new Error("Failed to generate AI response");
    }
};

export default aiService;
