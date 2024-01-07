import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';

// register bash for syntax highlighting
hljs.registerLanguage('bash', bash);

const Home = () => {
  // add react hooks for userInput, apiOutput, generating
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState({ command: '', description: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  // set userInput to updated text
  const onUserChangedText = (event) => {
    setUserInput(event.target.value)
  };

  // parse response to extract command and description
  const parseApiResponse = (apiResponse) => {
    const separation = apiResponse.split("\n```\n\n");
    const command = separation[0].replace("```bash\n", "");
    const description = separation[1];
    return { command, description };
  };

  // call api to generate response
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")

    // send POST request to api with data
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    // format output once received
    const data = await response.json();
    const { output } = data;

    console.log("here is your response")
    console.log(data)

    console.log("OpenAI replied...", output.message.content)

    // parse response then
    // update state of apiOutput, isGenerating
    const parsedOutput = parseApiResponse(output.message.content);
    setApiOutput(parsedOutput);
    console.log(parsedOutput)
    setIsGenerating(false);
  }

  return (
    <div className="root">
      <Head>
        <title>terminal wiz</title>
      </Head>

      <div className="container">
        <div className="header">

          <div className="header-title">
            <h1>terminal wiz</h1>
          </div>

          <div className="header-subtitle">
            <h2>ask what you want to do in the terminal and ye shall receive</h2>
          </div>

          <div className="prompt-container">
            {/* onChange of textarea, call fn (onUserChangedText) */}
            <textarea placeholder="start typing here" className="prompt-box" value={userInput}
              onChange={onUserChangedText} />

            <div className="prompt-buttons">
              <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}>
                <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>generate</p>}
                </div>
              </a>
            </div>
          </div>

          {apiOutput.command && (
            <div className="output">
              <div className="output-content">
                <div className="command-content">
                  <p>{apiOutput.command}</p>
                </div>
                <p>{apiOutput.description}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;
