import React, {useRef, useState, useEffect} from 'react';
import '../styles/components/ChatRoom.scss'

// components import
import Header from '../_layout/Header';
import Alert from '../_layout/Alert';

// icon 
import { CiChat1,CiChat2,CiPaperplane,CiUser,CiFolderOn,CiLocationArrow1 } from "react-icons/ci";
import { TbBrandTelegram, TbPlus } from "react-icons/tb";
// axios
import axios from 'axios';

/* 챗봇 대화 내용

1번) 새로운 대화창
신규 대화창 btn을 클릭시 이벤트 발생
리스트에 대화창 하나가 추가되고 추가된 대화창 보여주기


2번) 기존 대화창
리스트 클릭시 DB에 있는 data 가져오기
DB-data를 map으로 뿌려주고




*/






function ChatRoom(): JSX.Element{
  let [chatHistory, setChatHistory] = useState<String[]>([]);

// 마운트
// 대화 내용 데이터 조회
useEffect(() => {
  // ajax 요청
  axios.get('http://localhost:8080/')
  .then((result)=>{
    let copy:String[] = result.data.test_DB_data;
    setChatHistory(copy);
  })
  .catch((error)=>{console.log(error)})
}, []);

// alert 컴포넌트
let [AlertClick, setAlertClick] = useState(false);

function handleAlert(){setAlertClick(false);}

// 채팅 인풋 줄바꿈 기능
const textRef = useRef<HTMLTextAreaElement>(null);
const divRef = useRef<HTMLDivElement>(null);

let textInput = ():void =>{
  textRef.current!.style.height = 'auto';
  divRef.current!.style.height = 'auto';
  textRef.current!.style.height = textRef.current!.scrollHeight + "px";
  divRef.current!.style.height = (textRef.current!.scrollHeight+30) + "px";
}

  // chatHistory 업데이트
  useEffect(() => {
    console.log(chatHistory);
  }, [chatHistory]);

function historyFn(pram:string){
  const copy = [...chatHistory, 'user: '+pram];
  setChatHistory(copy);
}


// 채팅 기능
let [chatInputValue, setChatInputValue]= useState(``);

let postData={
  userValue : chatInputValue.trim(),
  chatHistory : chatHistory,
}

function chatBtnFn(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>){
  console.log("chatBtnFn 실행 체크");
  // 예외처리
  event.preventDefault();
  if(!chatInputValue.trim() === true) return setAlertClick(true); // 빈값과 스페이스 값만을 전송했을 경우
  historyFn(chatInputValue.trim()); // 데이터 관리

  // ajax 요청 진행
  axios.post('http://localhost:8080/chatEnter', postData)
  .then((result)=>{
    console.log(result.data);

    // data 가공


    // input  값 초기화
    setChatInputValue(``);
    textRef.current!.style.height = '30px';
    divRef.current!.style.height = '60px';
  })
  .catch((error)=>{
    console.log(error);
  });

}











  return (
  <div className='chat'>
    {AlertClick === true ? <Alert text={"질문을 작성해 주세요."} handleAlert={handleAlert} /> : null}
    <Header />
    <main>
      <ChatList />
      <div className='chat-room'>
        <div className='txt-box'>
          <ul>
          {chatHistory.map((value, index)=>{
            if(value.startsWith("user:") === true){
              return(
              <li className='user' key={index}>
                <div className='icon-box'><CiUser/></div>
                <pre>{value.replace("user:","")}</pre>
              </li>
              )
            }
            if(value.startsWith("AI:") === true){
              return(
                <li className='chat-bot' key={index}>
                  <div className='icon-box'><TbBrandTelegram /></div>
                  <pre>{value.replace("AI:","")}</pre>
                </li>
                )
            }
          })}

          </ul>
          <div className='empty-box'></div>
        </div>
        <div className='chat-input-box'>
          <div className='chat-input-box-inner' ref={divRef}>
            <textarea cols={85} rows={1} ref={textRef}
              value={chatInputValue}
              placeholder='여행 일정을 짜달라고 해보세요!'
              onChange={(e)=>{
                textInput();
                setChatInputValue(e.target.value);
              }}
              onKeyDown={(e)=>{
                if(!e.shiftKey && e.key === "Enter") chatBtnFn(e);
                if(e.shiftKey && e.key === "Enter") console.log("줄바꿈");
              }}
              >
            </textarea>
            <button onClick={(e)=>{chatBtnFn(e)}}><CiLocationArrow1/></button>
          </div>
        </div>
      </div>
    </main>
  </div>
  )
}


function ChatList(): JSX.Element{
  return (
  <div className='chat-list'>
    <ul>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
    </ul>
    <div className='chatroom-create-btn'><button><TbPlus/><span>New chat</span></button></div>
  </div>
  )
}

// export {DscrpTab, QandATab, ReviewTab}; //여러개 내보낼때

export default ChatRoom;