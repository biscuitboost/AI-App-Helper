import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    {/*console.log(event.target.value); */}
  setUserInput(event.target.value);
};
  return (
    <div className="root">
      <Head>
        <title>SmartSQL AI | robertbrewer.co.uk</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>SmartSQL AI</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get Answers to Your SQL Queries Instantly with SmartSQL AI</h2>
          </div>
          {/* Add this code here*/}
        <div className="prompt-container">
        <textarea
          className="prompt-box"
          placeholder="how do I get the current date?"
          value={userInput}
          onChange={onUserChangedText}/>       
        </div>
           {/* New code I added here */}
  <div className="prompt-buttons">
    <a className="generate-button" onClick={callGenerateEndpoint}>
      <div className="generate">
        <p>Ask</p>
      </div>
    </a>
  </div>
          
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
