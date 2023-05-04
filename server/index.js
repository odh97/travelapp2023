const express = require('express');
const path = require('path');
const app = express();

// cors / ajax
app.use(express.json());
var cors = require('cors');
app.use(cors());

// server open
app.listen(8080, function () {
  console.log('listening on 8080');
});

// app.use(express.static(path.join(__dirname, '/../client/build')));
// app.get('/', function(요청, 응답){
  // 응답.sendFile(path.join(__dirname, '/../client/build/index.html'));
// })

app.get('/', function(요청, 응답){
  응답.send("확인용");
})

// 데이터 조회 해보기
app.get('/testData', function(요청, 응답){
  응답.json({name : "ODae"});
})

// 번역 기능 구현
// 네이버 Papago 언어감지 API 예제
var client_id = 'tyDodzGry78dFOOdgyA6'; // 배포 전 재발급
var client_secret = 'Efl5YyRqwk'; // 배포 전 재발급

var query = "안녕하세요 저는 오대현입니다";

app.get('/detectLangs', function (req, res) {
  var api_url = 'https://openapi.naver.com/v1/papago/detectLangs';
  var request = require('request');
  var options = {
    url: api_url,
    form: { 'query': query },
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});











// 채팅 기능 구현
app.get('/chatEnter', function(요청, 응답){

  // openai
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({

    // apiKey: "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",  // 배포 전 재발급
    
  });
  const openai = new OpenAIApi(configuration);

  openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
            \n\nQ: What is human life expectancy in the United States?
            \nA: Human life expectancy in the United States is 78 years.
            \n\nQ: 여행지 추천해줄 수 있어?
            \nA:  여러분이 즐길 수 있는 여행지를 추천해 드리겠습니다. 가족과 함께 다녀볼 수 있는 곳으로, 
            뉴욕에 가면 미국 사람들이 많이
            \n\nQ: continue
            \nA: 방문하는 주요 관광지로는 십일탑과 뉴욕 중심부에 있는 빅뱅과 아마존 스페이스에 놀러갈 수 있습니다. 또한, 미국 선진화
            \n\nQ: continue
            \nA: 의 기원을 볼 수 있는 미국 역사 요새인 피닉스빌과 레이커 베이, 유네스코 세계 문화 유산으로 등재된 기틀란드 대학교까지 여
            \n\nQ: continue
            \nA: 러들이 즐길 수 있는 장소는 많습니다. 이외에도 메이지 인디애나, 라스베이거스, 밴쿠버, 워쉽턴과 같은 여러 도시를 방문해
            \n\nQ: continue
            \nA: 주변 자연을 눈길을 쏟을 수 있습니다. 방학 때 그리고 휴가 때 미국을 방문하실 때는 이런 여행지를 참고하세요.
            \n\nQ: Please make a trip to China for 2 nights and 3 days
            `,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  }).then((result)=>{
    console.log("============성공============");
    console.log(result.data.choices[0].text);
  }).catch((error)=>{
    console.log("==============실패====================");
    console.log(error);
  })

})


// React Router (항상 최하단으로)
app.get('*', function(요청, 응답){
  응답.sendFile(path.join(__dirname, '/../client/build/index.html'));
})
