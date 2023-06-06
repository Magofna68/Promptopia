import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// lambda function --> terminates after its done its job
export const POST = async (req, res) => {
  // extracted data from POST request
  const { userId, prompt, tag} = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ 
      creator: userId,
      prompt,
      tag,
    })

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    // send server error response
    return new Response("Failed to create new prompt", { status: 500 })
  }
}