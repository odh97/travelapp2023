const express = require('express');
const path = require('path');
const app = express();
var request = require('request');
const rp = require('request-promise');

// DB (id, pw 배포전 수정)
const DB_URI = 'mongodb+srv://eogus-travel-GPT-2023:4rTNhDpCitx6qRkr@cluster0.awi9wey.mongodb.net/?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(DB_URI, { useUnifiedTopology: true });

// cors / ajax
app.use(express.json());
var cors = require('cors');

app.use(cors({
  origin: true, // 출처 허용 옵션
  credentials: true // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));

// login, session
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

// openai API
const { Configuration, OpenAIApi } = require("openai");
const { setTimeout } = require('timers/promises');
const configuration = new Configuration({ apiKey: "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",  /* 배포 전 재발급 */ });
const openai = new OpenAIApi(configuration);

// papago API
var client_id = 'tyDodzGry78dFOOdgyA6'; // 배포 전 재발급
var client_secret = 'Efl5YyRqwk'; // 배포 전 재발급
var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

// server open
client.connect(function(error, client){
  if (error) return console.log(error);
  app.listen('8080', function(){

  db = client.db('travel');

  console.log('listening on 8080');
  });
})

// app.use(express.static(path.join(__dirname, '/../client/build')));
// app.get('/', function(요청, 응답){
  // 응답.sendFile(path.join(__dirname, '/../client/build/index.html'));
// })



app.get('/:id', function(요청, 응답){
  const test_DB_data2 = {
    ko_chat_arr: [
      'user: 너는 이제부터 여행컨설턴트야 관광지, 맛집, 유용한 정보 등등 여행에 관해서 좋은 정보를 알려줬으면 좋겠어',
      'AI: 물론이죠! 기꺼이 돕겠습니다. 관광지부터 시작합시다. 세계에서 가장 인기 있는 관광 명소로는 프랑스 파리의 에펠탑, 인도 아그라의 타지마할, 중국의 만리장성, 이탈리아 로마의 콜로세움이 있습니다. \n' +
      '\n' +
      '식당에 관해서라면, 전 세계에서 선택할 수 있는 수많은 선택지가 있다. 가장 높은 평가를 받은 식당으로는 스페인 지로나의 엘 셀레르 드 칸 로카, 프랑스 리옹의 라메르 브레이져, 일본 도쿄의 스키야바시 지로, 이탈리아 모데나의 오스테리아 프란체스카나 등이 있다. \n' +
      '\n' +
      '이 정보가 도움이 되었으면 좋겠어요!',
      'user: 너는 누구지??',
      'AI: 저는 당신의 여행 문의를 돕기 위해 고안된 AI 챗봇입니다. 관광지, 음식점 등 유용한 여행 정보를 알려드리려고 왔습니다.',
      'user: 다음부터는 너를 여행 컨설턴트로 소개해줬으면 좋겠어',
      'AI: 물론입니다! 지금부터 저를 여행 컨설턴트로 소개하겠습니다. 저는 당신의 모든 여행에 필요한 것들을 도우러 왔습니다. 관광지, 음식점 등 여행과 관련하여 궁금한 점이 있으면 알려주시기 바랍니다.',
      'user: 너는 누구지?',
      'AI: 안녕하세요! 저는 AI 챗봇이고 여행 컨설턴트입니다. 저는 당신의 모든 여행에 필요한 것들을 도우러 왔습니다. 관광지, 음식점 등 여행과 관련하여 궁금한 점이 있으면 알려주시기 바랍니다.',
    ],
    en_chat_arr: [
      'user: You are a travel consultant from now on. I want you to give me good information about travel, such as tourist attractions, restaurants, and useful information',
      "AI: Sure thing! I'm happy to help. Let's start with tourist attractions. Some of the most popular tourist attractions in the world include the Eiffel Tower in Paris, France; the Taj Mahal in Agra, India; the Great Wall of China; and the Colosseum in Rome, Italy. \n" +
      '\n' +
      'When it comes to restaurants, there are countless options to choose from around the world. Some of the most highly rated restaurants include El Celler de Can Roca in Girona, Spain; La Mère Brazier in Lyon, France; Sukiyabashi Jiro in Tokyo, Japan; and Osteria Francescana in Modena, Italy. \n' +
      '\n' +
      'I hope this information is helpful!',
      "user:  Who are you?",
      `AI:  I'm an AI chatbot designed to help you with travel information. I can provide you with tourist attractions, restaurants, and other useful information.`,
      "user:  What did I tell you to do when I introduced you earlier?",
      "AI:  When you introduced me earlier, you asked me to give you good information about travel, such as tourist attractions, restaurants, and useful information.",
      "user:  What did I tell you to do when I introduced you?",
      "AI:  When you introduced me, you asked me to give you good information about travel, such as tourist attractions, restaurants, and useful information.",
      "user:  I thought you told me to introduce you as a travel consultant",
      "AI:  Yes, that's right. You asked me to introduce myself as a travel consultant and provide you with good information about travel, such as tourist attractions, restaurants, and useful information.",
      "user:  Then introduce yourself again",
      "AI:  Hi there! My name is AI Chatbot and I'm a travel consultant. I'm here to help you with all your travel needs. Let me know if you have any questions about tourist attractions, restaurants, or anything else related to travel.",
    ]
  }
  // 현재 하드코딩 상태 나중에 DB 데이터로 교체
  응답.json({test_DB_data : test_DB_data2});
})






// counter 샘플
app.post('/add', function(req, res){
  db.collection('counter').findOne({name : 'postNumber'}, function(error, result){
    let totalNumber = result.totalNumber;
    db.collection('post').insertOne( { _id : (totalNumber + 1), title : req.body.title, date : req.body.date } , function(){
      console.log('저장완료');
      res.send('전송완료');
    });
  });
  
});


app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      const { message } = info; // 인증 실패 메시지 가져오기

      if (message === 'error_id')return res.status(401).json({ message: '존재하지 않는 아이디입니다.' });
      if (message === 'error_pw')return res.status(401).json({ message: '패스워드가 틀렸습니다.' });
      
      return res.status(401).json({ message: '인증 실패' });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({ message: '로그인 성공' });
    });
  })(req, res, next);
});

app.post('/register', function(req, res) {

});




passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
  failureFlash: true,
}, function (inputID, inputPW, done) {
  console.log(inputID, inputPW);

  db.collection('login').findOne({ id: inputID }, function (error, result) {
    console.log("db.collection('login')");
    
    if (error) return done(error);
    if (!result) return done(null, false, { message: 'error_id' });

    if (inputPW == result.pw) {
      return done(null, result)
    } else {
      return done(null, false, { message: 'error_pw' })
    }
  })

}));

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(아이디, done){
  db.collection('login').findOne({id : 아이디},function(에러 ,결과){
    done(null , 결과);
  })
});









// 채팅 API 함수
async function papagoAPI(sourcePram, targetPram, message){
  let options = {
    method: 'POST',
    uri: api_url,
    form: {
      source: sourcePram,
      target: targetPram,
      text: message
    },
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret
    },
    json: true
  };
  try {
    let body = await rp(options);
    let result = body.message.result.translatedText;

    return result;
  } catch (error) {
    console.log('error = ' + error.statusCode);
    throw error;
  }
}
async function chatGptAPI(pram) {
  console.log("GPT API in");
  console.log(pram);
  
  let message = "";
  for(let item of pram){
    message += item;
  }

  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" user: ", " AI: "],
    });

    return result.data.choices[0].text;

  } catch(error) {
    console.log(error);
  }
}
// 채팅 기능 구현
app.post('/chatEnter', async function (req, res) {
  let DB_chat_Obj_Data = req.body.chatDBHistory
  // ko_chat_arr
  // en_chat_arr

  try{
    // API 통신
/*
    const result1 = await papagoAPI("ko", "en", req.body.userValue);
    DB_chat_Obj_Data.en_chat_arr.push(result1);
    console.log("첫번째 번역 API 작업이 끝났습니다.");
    
    
    const result2 = await chatGptAPI(DB_chat_Obj_Data.en_chat_arr);
    DB_chat_Obj_Data.en_chat_arr.push(result2);
    console.log(result2);
    console.log("Chat GPT API 작업이 끝났습니다.");
    
    const result3 = await papagoAPI("en", "ko", result2);
    DB_chat_Obj_Data.ko_chat_arr.push(result3);
    console.log("마지막 번역 API 작업이 끝났습니다.");
    console.log(DB_chat_Obj_Data);
*/

    // DB 저장
    // 미작성

    let number = 1;
    number++;
    DB_chat_Obj_Data.en_chat_arr.push("user: test Data string"+number+number+number+number);
    DB_chat_Obj_Data.en_chat_arr.push("AI: test Data string"+number+number+number+number);
    DB_chat_Obj_Data.ko_chat_arr.push("AI: AI 테스트 데이터 문자"+number+number+number+number);
    console.log(DB_chat_Obj_Data);
    res.json({DB_chat_data : DB_chat_Obj_Data})

  }
  catch(error){
    console.log(error);
  }

});






// React Router (항상 최하단으로)
app.get('*', function(요청, 응답){
  응답.sendFile(path.join(__dirname, '/../client/build/index.html'));
})

