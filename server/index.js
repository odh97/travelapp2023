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

app.use(session({secret : '비밀코드', resave : false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); 

// openai API
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: "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",  /* 배포 전 재발급 */ });
const openai = new OpenAIApi(configuration);

// papago API
var client_id = 'tyDodzGry78dFOOdgyA6'; // 배포 전 재발급
var client_secret = 'Efl5YyRqwk'; // 배포 전 재발급
var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

// server open
var db;
client.connect(function(error, client){
  if (error) return console.log(error);
  app.listen('8080', function(){

  db = client.db('travel');

  console.log('listening on 8080');
  });
})

// passport
passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
  failureFlash: true,
}, function (inputID, inputPW, done) {
  console.log(inputID, inputPW);

  db.collection('login').findOne({ id: inputID }, function (error, result) {
    console.log("passport start");
    
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

passport.deserializeUser(function(userID, done){
  db.collection('login').findOne({id : userID},function(error ,result){
    done(null , result);
  })
});

//미들웨어
function loginChack(req, res, next){
  console.log("미들웨어 in");

  if(req.user){
    console.log(req.user);
    next(); // next : 다음으로 통과 시켜주는 함수
  } else{
    console.log(req.user);
    res.send('로그인안하셨는데요?');
  }
}


// date
var date = new Date();
var today_date = new Intl.DateTimeFormat('kr',{dateStyle : 'long',timeStyle: 'medium'}).format(date);
var style_date2 = new Intl.RelativeTimeFormat().format(7, 'days');
var next_week_date = new Intl.DateTimeFormat('kr',{dateStyle : 'long',timeStyle: 'medium'}).format(date.setDate(date.getDate() + 7));

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


// app.use(express.static(path.join(__dirname, '/../client/build')));
// app.get('/', function(요청, 응답){
  // 응답.sendFile(path.join(__dirname, '/../client/build/index.html'));
// })

app.get('/guest', function(요청, 응답){
  // 현재 하드코딩 상태 나중에 DB 데이터로 교체
  const basic_chat_data = {
    id : null,
    name : null,
    title : "새로운 채팅",
    chatting_arr : {
      ko_chat_arr: [
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
    },
    date : today_date,
  }
  응답.json({basic_chat_data : [basic_chat_data]});
});

app.get('/member', loginChack, function(req, res){
  console.log("member in");

  db.collection("chat-post").find({ name: req.user.id }).sort({ date: -1 }).toArray(function(error, result){
    res.json({chat_Data_Arr : result});
    console.log("member end");
  });
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
  console.log("chatEnter start");
  let chatDBHistory = req.body.chatDBHistory;
  let chatArr = req.body.chatDBHistory.chatting_arr;
  // ko_chat_arr
  // en_chat_arr
  console.log(req.body);
  console.log(chatArr);

  try{
    // API 통신
/*
    chatArr.ko_chat_arr.push(req.body.userValue);

    const result1 = await papagoAPI("ko", "en", req.body.userValue);
    chatArr.en_chat_arr.push(result1);
    console.log("첫번째 번역 API 작업이 끝났습니다.");
    
    
    const result2 = await chatGptAPI(chatArr.en_chat_arr);
    chatArr.en_chat_arr.push(result2);
    console.log(result2);
    console.log("Chat GPT API 작업이 끝났습니다.");
    
    const result3 = await papagoAPI("en", "ko", result2);
    chatArr.ko_chat_arr.push(result3);
    console.log("마지막 번역 API 작업이 끝났습니다.");
    console.log(chatArr);
*/

    let number = chatArr.ko_chat_arr.length;
    chatArr.ko_chat_arr.push(req.body.userValue);
    chatArr.en_chat_arr.push("user: test Data string"+number+number+number+number);
    chatArr.en_chat_arr.push("AI: test Data string"+number+number+number+number);
    chatArr.ko_chat_arr.push("AI: AI 테스트 데이터 문자"+number+number+number+number);
    chatDBHistory.chatting_arr = chatArr;
    
    // DB 저장
    // 미작성

    res.json({DB_chat_data : chatDBHistory});
    console.log("chatEnter end");
  }
  catch(error){
    console.log(error);
  }
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    // 로그인 실패 처리
    if (err) { return next(err); }
    if (!user) {
      const { message } = info; // 인증 실패 메시지 가져오기

      if (message === 'error_id')return res.status(401).json({ message: '존재하지 않는 아이디입니다.' });
      if (message === 'error_pw')return res.status(401).json({ message: '패스워드가 틀렸습니다.' });
      
      return res.status(401).json({ message: '인증 실패' });
    }
    // 로그인 성공
    req.logIn(user, function(err) {
      if (err) { return next(err); }

      db.collection("chat-post").find({ name: user.id }).sort({ date: -1 }).limit(1).toArray(function(error, result){
        return res.json({ message: result[0].id });
      });

    });
  })(req, res, next);
});

app.post('/register', function(req, res) {
  // 회원가입 여부 조회
  db.collection('login').findOne({id : req.body.id}, function(error, result_1){
    // 가입된 아이디
    if(!result_1 === false) return res.status(401).json({ message: '이미 가입된 아이디입니다. 다른 아이디로 가입을 진행해 주세요.' });

    // 없는 아이디 회원가입 처리
    if(result_1 === null){
      const db_input_Obj = {
        id : req.body.id,
        pw : req.body.pw,
        manager : false,
      }

      db.collection('login').insertOne( db_input_Obj , function(){
        console.log('회원가입완료');

        db.collection('counter').findOne({name : 'postNumber'}, function(error, result){
          let totalNumber = result.totalNumber;
          const basic_chat_data = {
            id : totalNumber+1,
            name : req.body.id,
            title : "새로운 채팅",
            chatting_arr : {
              ko_chat_arr: [
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
            },
            date : today_date,
          }

          db.collection('chat-post').insertOne( basic_chat_data , function(){
            console.log('chat-post DB 저장완료');
          });
          db.collection('counter').updateOne({name : 'postNumber'},{ $inc : {totalNumber:1} },function(){})
        });
        res.json({join_result : "register_success"});
      });
    };
  });
});

app.post('/logout', function(req, res, next){
  req.logOut(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


// app.post('/logout', function (req, res) {
//   console.log(req.session.cookie);
//   req.logout(function (err) {
//     if (err) {return next(err)}
//   });
//   req.session.save(function (err) {
//     req.session.cookie.expires = new Date(0); // 세션 쿠키의 만료 날짜를 과거로 설정하여 만료시킵니다.
//     res.clearCookie('connect.sid'); // connect.sid 쿠키를 삭제합니다.
//     res.json({ url: 'guest' });
//   });
// });



app.get('/community', loginChack, function(req, res){
  console.log("member in");

  res.send("community 접속이 되는가?");
});


app.get('/mypage', loginChack, function(req, res){
  console.log("member in");

  res.send("mypage 접속이 되는가?");
});

// React Router (항상 최하단으로)
app.get('*', function(요청, 응답){
  응답.sendFile(path.join(__dirname, '/../client/build/index.html'));
})