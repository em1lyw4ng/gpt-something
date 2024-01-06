import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  // add react hook useState
  const [userInput, setUserInput] = useState('');

  const onUserChangedText = (event) => {
    // call set state action fn (setUserInput) to update userInput
    setUserInput(event.target.value);
  };

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
              <a className="generate-button" onClick={null}>
                <div className="generate">
                  <p>generate</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;
