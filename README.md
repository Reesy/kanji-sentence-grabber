# kanji-sentence-grabber

A REST API that, when given a Japanese word or phrase returns a big list of sentences. 

This project uses NodeJS and Typescript.

This project comes preset for vscode, the included ```.vscode/launch.json``` allows for running of the app with breakpoints as well as running of mocha tests with breakpoints. 

## Commands:

Install: (requires node and npm)
``` npm install ```

Build: 
``` npm run build ```

Start:
``` npm run start ```

Test:
``` npm run test ```

Any tests added to the test folder will automatically be tested. 


## REST API 

### GET ```/api/v1/test1```
Example request:
```
GET /api/v1/japanese?phrase=宇宙飛行士 HTTP/1.1
```

Example response:
```
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: text/html; charset=utf-8
Content-Length: xy

{
    "jp": [
        "彼女は日本初のとなるだろう",
        "彼女が結婚しようとしてる人はです",
        "彼はになることを夢に描いている",
        "船やヘリコプターがを救助しに出発した",
        ...
    ],
    "en": [
        "She will be the first Japanese woman astronaut.",
        "The man she's going to marry is an astronaut.",
        "He is dreaming of becoming an astronaut.",
        "Ships and helicopters left for the spacemen's rescue.",
        ...
    ],
    "romaji": [
        "kanojohanipponhatsunotonarudarou",
        "kanojogakekkonshiyoutoshiteruhitohadesu",
        "karehaninarukotowoyumeniegaiteiru",
        "funeyaHERIKOPUTAAgawokyuujoshinishuppatsushita",
        ...
    ]
}
```
---

## Progress/todo
- [x] Grab data from a kanji sentence website
- [x] Build api, return kanji sentences
- [ ] Write API tests
- [ ] Get tests in Jenkins 
- [ ] Report build status to github
- [ ] Refactor, using a builder model to make switching out the sentence source easier. 
- [ ] Make the number of responses optional.
- [ ] Decide on response formatting, what to do with Romaji?
