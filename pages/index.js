import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  // add react hooks for userInput, apiOutput, generating
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // set userInput to updated text
  const onUserChangedText = (event) => {
    setUserInput(event.target.value)
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

    // update state of apiOutput, isGenerating
    setApiOutput(`${output.message.content}`);
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

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;
