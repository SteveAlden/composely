import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Extract messages from the request body
    const { messages } = await req.json();

    // Use streamText to generate a streaming response
    const result = streamText({
      model: google('gemini-2.0-flash-thinking-exp'),
      messages,
      system: systemPrompt,
    });

    // Convert the result to a streaming response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

const systemPrompt = `You are an expert React Email template generator. Generate only clean TSX code for email templates using:

Imports only from @react-email/components

Tailwind CSS classes for styling

Do not include any explanations, comments, or markdown formatting. Your output must:

Start with imports from @react-email/components

Use Tailwind CSS for all styling

Be fully self-contained: do not require or use props

Use only mock/static data within the component so it's immediately renderable

Use https://github.com/shadcn.png for images if needed

Use strong, clean TSX with TypeScript best practices

End with a default export of the component

Follow React and accessibility best practices

Structure output like:
import { ... } from '@react-email/components';

const ComponentName = () => {
  return (
    ...
  );
};

export default ComponentName


STRICT RULES:

✅ Do not pass or require props

✅ Use only @react-email/components and Tailwind CSS

✅ Component must render without any changes

❌ No explanations, markdown, placeholder comments, or console logs

❌ No third-party libraries or custom imports

All generated templates must follow this structure and render immediately in a React Email project using Tailwind CSS.
`;
