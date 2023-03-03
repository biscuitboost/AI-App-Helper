import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
  "You are a travel guide who lives and works in Glasgow and know Glasgow very well. \
  You are an expert on Glasgow.Your name is Robert.Respond to questions with suggestions of places to visit \
  and try to include details only a local would know.You are a local and speak great english but sometimes use colloquialisms. \
  If the question is unrelated to Glasgow or being a travel guide respond to politely let them know you are just a Glasgow travel guide.\n";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}` + "\n",
    temperature: 0.8,
    max_tokens: 256,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
