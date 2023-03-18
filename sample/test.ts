import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getResponse(){

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Hello world",
      });
      console.log(completion.data.choices[0].text);
}

getResponse().catch((error) => console.error(error));

