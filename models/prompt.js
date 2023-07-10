import mongoose, { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.']
  },
  tag: {
    type: String,
    required: [true, "Tag is required."]
  },
  tagList: {
    type: [String],
    required: [true, "Enter at least 1 tag."]
  }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;