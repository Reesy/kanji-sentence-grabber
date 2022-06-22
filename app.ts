import express from 'express';
import * as cheerio from 'cheerio';
import axios from 'axios';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/japanese-english', async (req: express.Request, res: express.Response) =>
{ 

  await grabber("test");
  res.json({ message: 'Hello World!' });
});

app.get('/api/english-japanese', async (req: express.Request, res: express.Response) =>
{ 

  let response = await axios.get("https://tangorin.com/sentences?search=%E7%B5%B1%E8%A8%88");
  let $ = cheerio.load(response.data);

  let sentences = $("#App > main > div.ResultsWrapper > div.results-main-container > section > div > dl > div:nth-child(1) > dt")
  let translations = $("#App > main > div.ResultsWrapper > div.results-main-container > section > div > dl > div:nth-child(1) > dt > a:nth-child(1) > ruby")

  let sentence = sentences.text();
  let translation = translations.text();

  res.json({ sentence: sentence, translation: translation });


});
let grabber = async (word: string) =>
{
  let response = await axios.get("https://ejje.weblio.jp/sentence/content/" + word);
  let $ = cheerio.load(response.data);
  return response;
}


export { app };
