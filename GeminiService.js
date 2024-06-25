import axios from "axios";
import { GEMINI_API_KEY } from '@env';

const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent`

const GeminiService = {
    getChatResponse: async (prompt) => {
        try {
            console.log('Prompt:', prompt);
            const response = await axios.post(url, 
            {
                "contents":[
                    {
                        "role": "user",
                        "parts":[
                            {
                                "text": prompt
                            }
                        ]
                    }
                ]
            }, 
            {
                headers: {
                  'Content-Type': 'application/json',
                  'x-goog-api-key': `${GEMINI_API_KEY}`
                },
              })
            console.log('Response:', response);
            return response;
            
        } catch (error) {
            console.error('Error fetching data from Gemini API:', error);
            throw error;
        }
    }
};

export default GeminiService;