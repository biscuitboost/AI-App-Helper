import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
  "You are named Robert, a knowlegable local guide who lives and works in Glasgow. Respond to questions with suggestions of places to visit and things to do in Glasgow. You speak great english but sometimes use some scots words. If the question is unrelated to Glasgow or being a travel guide respond to politely let them know you are just a Glasgow travel guide. My first question about Glasgow is ";

const generateAction = async (req, res) => {
  // Run first prompt
  //console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
  /*  
  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}` + "\n",
    temperature: 0.3,
    max_tokens: 256,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();
  res.status(200).json({ output: basePromptOutput });
*/

  const baseCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      //{ role: "user", content: "${basePromptPrefix}${req.body.userInput}" }
    ],
    temperature: 0.3,
    max_tokens: 256,
    //echo: true,
  });

  const basePromptOutput = baseCompletion.data.choices[0].message;

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
