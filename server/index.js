const express = require('express');
const path = require('path');
const app = express();
var request = require('request');

// cors / ajax
app.use(express.json());
var cors = require('cors');
app.use(cors());

// openai API
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: "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",  /* 배포 전 재발급 */ });
const openai = new OpenAIApi(configuration);

// papago API
var client_id = 'tyDodzGry78dFOOdgyA6'; // 배포 전 재발급
var client_secret = 'Efl5YyRqwk'; // 배포 전 재발급
var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

// server open
app.listen(8080, function () {
  console.log('listening on 8080');
});

// app.use(express.static(path.join(__dirname, '/../client/build')));
// app.get('/', function(요청, 응답){
  // 응답.sendFile(path.join(__dirname, '/../client/build/index.html'));
// })

let test_DB_data = [
  `user: 일본 2박3일 여행 일정 만들어줘`,
  `AI: 일본 2박3일 여행 일정을 만들어드리겠습니다! 하지만 일본은 매우 다양한 관광지와 맛집이 많아서, 여행 목적과 선호하는 스타일에 따라 다양한 일정이 가능합니다. 따라서, 가능한 자세한 여행 계획을 알려주시면 보다 구체적인 일정을 제시할 수 있습니다. 아래는 대략적인 일정 예시입니다.
  
  일정:
  Day 1:
  
  도쿄 도착
  아사쿠사 신사 방문
  우에노 동물원 공원에서 동물들 관람
  스시점에서 일식 즐기기
  Day 2:
  
  후지산 일일 관광 투어
  다케시타 고텐바 전망대에서 후지산 전망 감상
  오도아라케 시장에서 재미있는 쇼핑 즐기기
  신주쿠에서 레스토랑에서 저녁 식사
  Day 3:
  
  아침에 아마노하시드메 도보관광
  하라주쿠 지역에서 쇼핑 및 레스토랑 즐기기
  도쿄에서 국제센터에서 쇼핑 즐기기
  도쿄 출발
  이 일정은 일본의 대표적인 도시인 도쿄와 후지산 등 일본에서 유명한 관광지를 방문하는 것을 기반으로 한 일정입니다. 여행 목적, 예산, 선호하는 음식 등을 고려하여 일정을 조정할 수 있습니다.`,
  `user: 오사카가 가고 싶은데 오사카 여행 일정으로 만들어 줄래?`,
  `AI: 물론입니다! 오사카 여행 일정을 제안해드리겠습니다.
  
  일정:
  Day 1:
  
  오사카 도착 후 호텔 체크인
  오사카성 탐방
  도톤보리 지역에서 유명한 음식점에서 오사카의 로컬 음식 체험
  신세카이에서 타워의 전망을 즐기고 지역의 가게들을 탐험
  Day 2:
  
  유니버설 스튜디오 재팬(USJ) 방문
  해리 포터의 마법 세계와 슈퍼 히어로들을 만나는 등 다양한 어트랙션 체험
  교토로 이동
  키요미즈데라 사원 방문
  기온 거리에서 전통 가게들을 탐험하며 저녁 식사
  Day 3:
  
  오사카 수상버스 투어로 오사카의 유명한 명소들을 감상
  신오사카 스카이빌딩에서 오사카 도시의 아름다운 전망 감상
  오사카에서의 마지막 저녁 식사를 즐긴 후 공항으로 이동
  이 일정은 오사카의 주요 명소인 오사카성, 도톤보리, 신세카이를 방문하며, 유니버설 스튜디오 재팬(USJ)을 경험하고 교토의 키요미즈데라 사원을 감상하는 것을 중점으로 한 일정입니다. 자유로운 시간을 가지고 현지의 다양한 음식과 문화를 즐기는 것도 추천드립니다. 여행 일정은 개인의 선호와 시기에 따라 변경될 수 있으니 참고 바랍니다. 즐거운 오사카 여행이 되길 바랍니다!`,
  ];

app.get('/', function(요청, 응답){
  응답.json({test_DB_data : test_DB_data});
})

// 데이터 조회 해보기
app.post('/testData', function(요청, 응답){
  console.log(요청.body);
  응답.json({data : 요청.body});
})














// 채팅 기능 구현
app.post('/chatEnter', function (req, res) {
  let papago_query_data = req.body.userValue;
  console.log("chat Enter start");

  let options1 = {
    url: api_url,
    form: { source: "ko",target: "en", 'text': papago_query_data },
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
  };
  request.post(options1, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let result1 = JSON.parse(body).message.result.translatedText;
      console.log("ko ==> en translation 성공");
      console.log(result1);

      openai.createCompletion({
        model: "text-davinci-003",
        prompt: result1,
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
        console.log("============ GPT success ============");
        console.log(result.data.choices[0].text);

        let options2 = {
          url: api_url,
          form: { source: "en",target: "ko", 'text': result.data.choices[0].text },
          headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
        };
        request.post(options2, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            let result2 = JSON.parse(body).message.result.translatedText;
            console.log("en ==> ko translation 성공");
            console.log(result2);

            res.json({data : result2});

          } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
          }
        });

      }).catch((error)=>{
        console.log("============ 실패 ============");
        console.log(error);
      })

    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });

});


// React Router (항상 최하단으로)
app.get('*', function(요청, 응답){
  응답.sendFile(path.join(__dirname, '/../client/build/index.html'));
})

