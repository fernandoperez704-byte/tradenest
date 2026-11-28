import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateGabyResponse(
  options: Omit<OpenAI.ChatCompletionCreateParamsNonStreaming, "model">
) {
  return openai.chat.completions.create({
    ...options,
    model: "gpt-5.6-luna",
  });
}