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


interface extractedJapaneseSentenceComponents
{
  jp: string[];
  romaji: string[];
}

interface extractedJapaneseSentence
{
  jp: string;
  romaji: string;
}
interface sentenceBody
{
  jp: string;
  en: string;
  romaji: string;
};


let englishSentences: string[] = [];
let japaneseSentences: string[] = [];
let romajiSentences: string[] = [];

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
          switch (sentenceContainer.attribs.class)
          {
            case "s-jp": // empty
              let extractedSentenceComponents: extractedJapaneseSentenceComponents = extractJapaneseSentence(sentenceContainer);
              let fullJPSentence = buildJapaneseSentence(extractedSentenceComponents.jp);
              let fullRomajiSentence = buildRomajiSentence(extractedSentenceComponents.romaji);
              japaneseSentences.push(fullJPSentence);
              romajiSentences.push(fullRomajiSentence);
              break;
            case "s-en": // empty
              let extractedEnglishSentence = extractEnglishSentence(sentenceContainer);
              englishSentences.push(extractedEnglishSentence);
              break;

          };

        });

      });

  res.json({ JPSentences: japaneseSentences, romajiSentences: romajiSentences, englishSentences: englishSentences });


});

let grabber = async (word: string) =>
{
  let response = await axios.get("https://ejje.weblio.jp/sentence/content/" + word);
  let $ = cheerio.load(response.data);
  return response;
}


function extractEnglishSentence(_sentenceContainer: any): string
{ 

  let englishSentence: string = "";
  if (_sentenceContainer.children.length === 0)
  { 
    console.log('sentence container had no top level children');
    return '';
  }

  if (typeof(_sentenceContainer.children[0].children) === "undefined")
  {
    console.log('There is no data for english word entries in the span/mark tag');
    return '';
  };

  _sentenceContainer.children[0].children.forEach((tags: any) =>  
  { 
    if (tags.type === "text")
    {
      englishSentence += tags.data;
    }
  });


  return englishSentence;
};

// A function named sentenceExtractor that returns a sentenceBody object.
function extractJapaneseSentence(_sentenceContainer: any): extractedJapaneseSentenceComponents
{
  let sentenceComponents: extractedJapaneseSentenceComponents = {
    jp: [],
    romaji: []
  };


  if (_sentenceContainer.children.length === 0)
  {
    console.log('Found one without');
    return sentenceComponents;
  }

  _sentenceContainer.children.forEach((sentenceTags: any) =>  
  {
    if (typeof (sentenceTags.children) === "undefined")
    {
      console.log('Tags have no children');
      return;
    }

    sentenceTags.children.forEach((sentence: any) =>
    {
      if (typeof (sentence.children) === "undefined")
      {
        console.log('sentence has no children');
        return;
      }

      if (sentence.name === "ruby")
      {
        sentenceComponents.jp.push(sentence.children[0].data); // japanese
        sentenceComponents.romaji.push(sentence.children[1].children[0].data); // romaji
      }
    });


  });

  return sentenceComponents;

};

function buildRomajiSentence(romajiSentence: string[]): string
{
  let romajiSentenceString: string = "";
  romajiSentence.forEach((sentence: string) =>
  {
    romajiSentenceString += sentence;
  }
  );
  return romajiSentenceString;
};


function buildJapaneseSentence(japaneseSentence: string[]): string
{
  let japaneseSentenceString: string = "";
  japaneseSentence.forEach((sentence: string) =>
  {
    japaneseSentenceString += sentence;
  });
  return japaneseSentenceString;
};



export { app };
