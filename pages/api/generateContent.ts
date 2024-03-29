import Anthropic from '@anthropic-ai/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  userAge: string;
  userHobby: string;
  userLocation: string;
}

// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userAge, userHobby, userLocation } = req.body as RequestBody;

    try {
      const prompt = `Generate a personalized content for a person who is ${userAge} years old in ${userLocation} and loves ${userHobby}. 
      The content should be related to finance that is engaging, informative, and tailored to their interests.
      Do not mention the person's age, location, or hobby.
      Please format the content in json with "title", "body" and "section". 
      Start your response with the json formatted content, enclose entire response in {}.`;

      const response = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [
          {"role": "user", "content": prompt}
        ]
      });

      const generatedContent = response.content.at(0)?.text;
      const content = JSON.parse(generatedContent || '{}');
      res.status(200).json({ content });
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;