import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<any>('');
  const configuration = new Configuration({
    organization: process.env.REACT_APP_OPENAI_ORG,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await openai.createImage({
      prompt,
      n: 2,
      size: '1024x1024',
    });
    const image_url = response.data.data[0].url;
    console.log(image_url);
    setResult(image_url);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={prompt} onChange={handlePromptChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {result && <img height={100} width={100} src={result} alt={prompt} />}
      </div>
    </div>
  );
}

export default App;
