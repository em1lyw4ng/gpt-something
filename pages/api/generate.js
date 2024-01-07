import OpenAI from "openai";

// set up openAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// initialize prompt string
const basePromptPrefix = "You have knowledge of all terminal commands possible and also know how to piece together commands to execute complex tasks in the terminal. You will be asked by programmers with little knowledge of terminal commands about how to do something in the terminal, so you should give the command accompanied with a description of what each part does in less than 10 words.";

const generateAction = async (req, res) => {

    // woohoo chat time
    const baseCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: [{
            role: "system",
            content: `${basePromptPrefix}`
        }, {
            role: "user",
            content: `${req.body.userInput}`,
        }],
    });

    // return message object
    const basePromptOutput = baseCompletion.choices.pop();

    // check that response has command and description
    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
