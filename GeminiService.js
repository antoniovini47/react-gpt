import axios from "axios";
import { GEMINI_API_KEY } from '@env';
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';


const geminipro = `/v1/models/gemini-pro:generateContent`;


const version = geminipro; //Select Version Here
const url = `https://generativelanguage.googleapis.com${version}`;

const GeminiService = {
    getImageResponse: async (prompt, image) => {
        console.log('Prompt:', prompt);
        console.log('Image:', image);
        try {
            const response = await axios.post(url, 
            {
                "contents":[
                    {
                        "role": "user",
                        "parts":[
                            {
                                fileData: {
                                    mimeType: "image/jpg",
                                    fileUri: image,
                                }
                            }, 
                            {
                                "text": prompt
                            },
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
    },

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