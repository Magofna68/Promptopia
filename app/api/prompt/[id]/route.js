// GET -> Read PATCH -> update, DELETE -> deletion
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import { connect } from 'mongoose';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id)
    .populate('creator');

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
    return new Response("Failed to fetach all prompts", { status: 500 });
  }
}

export const PATCH = async (request, {params}) => {
  const { prompt, tag, tagList } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.tagList = tagList;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {status: 200 })

  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 })
  } catch (error) {
    return new Response("Unable to Delete", { status: 500 });
  }
}