import express from 'express';
import Puppeteer from 'puppeteer';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/japanese-english', async (req: express.Request, res: express.Response) =>
{ 

  await grabber("test");
  res.json({ message: 'Hello World!' });
});

app.get('/api/english-japanese', (req: express.Request, res: express.Response) =>
{ 



  fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));



  // res.json({ message: 'Hello World!' });
});





let grabber = async (word: string) => {
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://ejje.weblio.jp/sentence/content/%E3%81%8A%E3%81%84%E3%81%A7 ');
  await page.waitForXPath('//*[@id="main"]/div[7]/div[2]/div/div[2]/p[1]/b/b');
  // let test = document.querySelector('#main > div:nth-child(8) > div.kijiWrp > div > div:nth-child(3) > p.qotCJJ > b > b');
  console.log(test);
  console.log('Done');

  await page.screenshot({ path: 'example.png' });

  await browser.close();

};



// app.post('/api/v1/test1', (req: express.Request, res: express.Response) =>
// {
//   let body: any = req.body;
//   let responseMessage = `The body was: ${body.message}!`;
//   res.json(responseMessage);
// });


export { app };
