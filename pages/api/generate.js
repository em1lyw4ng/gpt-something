import OpenAI from "openai";

// set up openAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// initialize prompt string
const basePromptPrefix = "";

const generateAction = async (req, res) => {
    // shows the full prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    // woohoo chat time
    const baseCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: [{
            role: "user",
            content: `${basePromptPrefix}${req.body.userInput}`
        }],
    });

    // return message object
    const basePromptOutput = baseCompletion.choices.pop();

    // check that response has command and description
    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
