import React, {useRef} from 'react';
import '../styles/components/ChatRoom.scss'

// components import
import Header from '../_layout/Header';

// icon 
import { CiChat1,CiChat2,CiPaperplane,CiUser,CiFolderOn,CiLocationArrow1 } from "react-icons/ci";
import { TbBrandTelegram } from "react-icons/tb";
/* 챗봇 대화 내용

1번) 새로운 대화창
신규 대화창 btn을 클릭시 이벤트 발생
리스트에 대화창 하나가 추가되고 추가된 대화창 보여주기


2번) 기존 대화창
리스트 클릭시 DB에 있는 data 가져오기
DB-data를 map으로 뿌려주고




*/
let user_val = "유저가 질문한 데이터 입니다.";
let test_respones_data = "A: 성공했을때 리턴값입니다.";
let test_DB_data = [
  "Q:일본 여행 일정 짜줘!!!",
  "A:제가 그걸 어떻게 짜줘요 ㅎㅎ",
  "Q:이거 어떻게 써먹어..",
  "A:저도 잘 모르겠습니다~~",
];

let user = "Q:" + user_val;
let chatBot = test_respones_data;

test_DB_data.push(user);
test_DB_data.push(chatBot);




function ChatRoom(): JSX.Element{

// const inputRef = useRef<HTMLTextAreaElement>(null);
const textRef = useRef<HTMLTextAreaElement>(null);
let test = ():void =>{
  textRef.current!.style.height = 'auto';
  textRef.current!.style.height = textRef.current!.scrollHeight + "px";
}

const divRef = useRef<HTMLDivElement>(null);
let test2 = ():void =>{
  textRef.current!.style.height = 'auto';
  divRef.current!.style.height = 'auto';
  textRef.current!.style.height = textRef.current!.scrollHeight + "px";
  divRef.current!.style.height = (textRef.current!.scrollHeight+30) + "px";
}


  return (
  <div className='chat'>
    <Header />
    <main>
      <ChatList />
      <div className='chat-room'>
        <div className='txt-box'>
          <ul>
          {test_DB_data.map((value, index)=>{
            if(value.charAt(0) === "Q"){
              return(
              <li className='user' key={index}>
                <div><CiUser/></div>
                {value.replace("Q:","")}
              </li>
              )
            }
            if(value.charAt(0) === "A"){
              return(
                <li className='chat-bot' key={index}>
                  <div><TbBrandTelegram/></div>
                  {value.replace("A:","")}
                </li>
                )
            }
          })}
          <li><CiUser/></li>
          <li><CiChat1/></li>
          <li><CiChat2/></li>
          <li><CiFolderOn/></li>
          </ul>
          <div className='empty-box'>빈공간</div>
        </div>
        <div className='chat-input-box'>
          <div className='chat-input-box-inner' ref={divRef}>
            <textarea cols={85} rows={1}
              ref={textRef}
              onChange={()=>{test2()}}>
            </textarea>
            <button><CiLocationArrow1/></button>
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
      <li><button>chat item btn1</button></li>
      <li><button>chat item btn2</button></li>
      <li><button>chat item btn3</button></li>
      <li><button>chat item btn4</button></li>
      <li><button>chat item btn5</button></li>
      <li><button>chat item btn6</button></li>
    </ul>
    <div><button>chatroom-create-btn</button></div>
  </div>
  )
}

// export {DscrpTab, QandATab, ReviewTab}; //여러개 내보낼때

export default ChatRoom;