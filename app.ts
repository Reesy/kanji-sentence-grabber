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



interface sentenceBody
{
  jp: string;
  en: string;
  romaji: string;
};


let englishSentences: string[] = [];
let japaneseSentences: string[] = [""];
let romajiSentences : string[] = [];

app.get('/api/english-japanese', async (req: express.Request, res: express.Response) =>
{

  let response = await axios.get("https://tangorin.com/sentences?search=%E7%B5%B1%E8%A8%88");
  let $ = cheerio.load(response.data);

  $("#App > main > div.ResultsWrapper > div.results-main-container > section > div > dl").children()
    .each(
      (i, sentenceCollection) =>
      {
        $(sentenceCollection).children().each((y, sentenceContainer: any) =>
        {
          if (sentenceContainer.attribs.class === "entry-menu-wrap")
          {
            return;
          }
          sentenceExtractor(sentenceContainer);
        });
        // console.log(i);
        // console.log('elem', $(elem).text());

      });

  let sentences = $("#App > main > div.ResultsWrapper > div.results-main-container > section > div > dl > div:nth-child(1) > dt")
  let translations = $("#App > main > div.ResultsWrapper > div.results-main-container > section > div > dl > div:nth-child(1) > dt > a:nth-child(1) > ruby")

  let sentence = sentences.text();
  let translation = translations.text();

  console.log(japaneseSentences);
  res.json({ sentence: sentence, translation: translation });


});
let grabber = async (word: string) =>
{
  let response = await axios.get("https://ejje.weblio.jp/sentence/content/" + word);
  let $ = cheerio.load(response.data);
  return response;
}

// A function named sentenceExtractor that returns a sentenceBody object.
let sentenceExtractor = (html: string) =>
{

  

  let transientSentenceBody: sentenceBody = 
  { 
    jp: "shouldBeJP", 
    en: "shouldBeEn", 
    romaji: "shouldBeRomaji"
  };

    return transientSentenceBody;
}



export { app };
