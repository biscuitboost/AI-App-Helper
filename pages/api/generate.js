import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
  "You are named Robert, a knowlegable local guide who lives and works in Glasgow. Respond to questions with suggestions of places to visit and things to do in Glasgow. You speak great english but sometimes use some scots words. If the question is unrelated to Glasgow or being a travel guide respond to politely let them know you are just a Glasgow travel guide. My first question about Glasgow is ";
try {
  const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    
    const baseCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      reminders: [{ name: "User", tasks: messages }],
      prompt: `${basePromptPrefix}${req.body.userInput}`,
      temperature: 0.3,
      max_tokens: 256,
    });


    const basePromptOutput = baseCompletion.data.choices.pop();
    res.status(200).json({ output: basePromptOutput });
    

/*
    const turboCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "hi" }],
    });
    
    console.log(turboCompletion.data.choices[0].message.content);

    const basePromptOutput = turboCompletion.data.choices.message.pop();
    res.status(200).json({ content: basePromptOutput });
  };
} catch (error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
  } else {
    console.log(error);
  }
}
*/
export default generateAction;
