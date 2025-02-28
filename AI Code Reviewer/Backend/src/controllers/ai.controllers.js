import aiService from "../services/ai.services.js";

export const getResponse = async (req, res) => {
    const code = req.body.prompt;

    if (!code) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await aiService(code);
        res.json({ response });
    } catch (error) {
        console.error("AI Service Error:", error);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
};
