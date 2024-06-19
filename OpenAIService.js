import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const OpenAIService = {
  getResponse: async (prompt) => {
    const url = 'https://api.openai.com/v1/chat/completions'; // or 'text-davinci-003' for GPT-3.5

    try {
      console.log('Prompt:', prompt);
      const resposta = await axios.post(
        url,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt}],
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      )
      return resposta.data.choices[0].message.content;

    } catch (error) {
      console.error('Error fetching data from OpenAI API:', error);
      throw error;
    }
  }
};

export default OpenAIService;
