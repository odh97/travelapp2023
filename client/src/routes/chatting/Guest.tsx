import React, {useRef, useState, useEffect} from 'react';
import '../../styles/components/ChatRoom.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';

// icon 
import { CiChat2,CiPaperplane,CiUser,CiFolderOn,CiLocationArrow1 } from "react-icons/ci";
import { TbBrandTelegram } from "react-icons/tb";

// axios
import axios from 'axios';

// router
import ChatList from './ChatList';

// redux
import { useDispatch, useSelector } from "react-redux"
import { changeName } from "../../store/store"


// date
var date = new Date();
var today_date = new Intl.DateTimeFormat('kr',{dateStyle : 'long',timeStyle: 'medium'}).format(date);
var style_date2 = new Intl.RelativeTimeFormat().format(7, 'days');
var next_week_date = new Intl.DateTimeFormat('kr',{dateStyle : 'long',timeStyle: 'medium'}).format(date.setDate(date.getDate() + 7));



// chatting mongodb 구조
// id : 유저 이름
// title : 채팅방 이름 (기본 채팅방 이름 : 새로운 채팅)
// chatting_arr : ko_chat_arr[...], en_chat_arr[...]
// date : 날짜

// chatRoom_local_obj localStorage 구조
// title : 채팅방 이름 (기본 채팅방 이름 : 새로운 채팅)
// chatting_arr : ko_chat_arr[...], en_chat_arr[...]
// date : 날짜

// 로컬 채팅 기록 조회 o
// 로컬 채팅 만료일 등록
// 로컬 데이터 저장 o
// 로컬 title 기본 값 설정 및 수정 기능 넣기



// type 지정
type DBHistoryType = {
  id: null | string;
  title: string;
  chatting_arr: {
      ko_chat_arr: string[];
      en_chat_arr: string[];
  };
  Date: Date;
};

function Guest(): JSX.Element{
  let [chatDBHistory, setChatDBHistory] = useState<DBHistoryType>();

  // 마운트
  // 대화 내용 데이터 조회
  useEffect(() => {
    let getLocalStorage = localStorage.getItem('chatRoom_local_obj');

    // 로컬 데이터 조회
    if(getLocalStorage !== null){
      let chatRoom_local_obj = JSON.parse(getLocalStorage);
      setChatDBHistory(chatRoom_local_obj);
    } else{
      // ajax 요청
      axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/guest')
      .then((result)=>{
        let copy:DBHistoryType = result.data.basic_chat_data;
        setChatDBHistory(copy);
        console.log(copy);
      })
      .catch((error)=>{console.log(error)})
    }

  }, []);



  // alert 컴포넌트
  let [alertClick, setAlertClick] = useState(false);
  function handleAlert(){setAlertClick(false);}

  // useRef HTML-Element
  const txtBoxDivRef = useRef<HTMLDivElement>(null);
  const inputTextRef = useRef<HTMLTextAreaElement>(null);
  const inputDivRef = useRef<HTMLDivElement>(null);

  let textInput = ():void =>{
    // 채팅 인풋 줄바꿈 기능
    inputTextRef.current!.style.height = 'auto';
    inputDivRef.current!.style.height = 'auto';
    inputTextRef.current!.style.height = inputTextRef.current!.scrollHeight + "px";
    inputDivRef.current!.style.height = (inputTextRef.current!.scrollHeight+30) + "px";
  }

  // chatDBHistory 업데이트
  useEffect(() => {
    // input 값 초기화
    setChatInputValue(``);
    inputTextRef.current!.style.height = '30px';
    inputDivRef.current!.style.height = '60px';
    
    // chatRoom scroll 최신 콘텐츠 위치로 이동
    if(txtBoxDivRef.current) txtBoxDivRef.current.scrollTop = txtBoxDivRef.current.scrollHeight;
    
  }, [chatDBHistory]);

  const updateChatHistory = (newMessage:string)=>{
    const copy = chatDBHistory;
    if(copy !== undefined){
      copy.chatting_arr.ko_chat_arr.push(newMessage);
    }
    setChatDBHistory(copy);
  }

  /* 채팅 기능 */
  let [chatInputValue, setChatInputValue]= useState(``);

  function chatBtnFn(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>){
    console.log("chatBtnFn 실행 체크");
    // 예외처리
    event.preventDefault();
    if(!chatInputValue.trim() === true) return setAlertClick(true); // 빈값과 스페이스 값만을 전송했을 경우

    //POST data
    updateChatHistory(`user: ${chatInputValue.trim()}`);
    const chatDBHistory_copy = chatDBHistory;
    const postData = {
      userValue: `user: ${chatInputValue.trim()}`,
      chatDBHistory: chatDBHistory_copy,
    };

    // ajax 요청 진행
    axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/chatEnter', postData)
    .then((result)=>{
      console.log(result.data.DB_chat_data.chatting_arr);

      setChatDBHistory(result.data.DB_chat_data);
    })
    .catch((error)=>{
      console.log(error);
    });

  }
  /* //채팅 기능 */

  // 언마운트 (로컬 스토리지 업데이트) (상태 변수 업데이트로 언마운트 실행시 최신 변수 적용)
  useEffect(()=>{
    // 마지막으로 로컬에 새롭게 저장
    return()=>{
      if(chatDBHistory){
        localStorage.setItem("chatRoom_local_obj",JSON.stringify(chatDBHistory));
      }
    }
  },[chatDBHistory]);

  return (
  <div className='chat'>
    {alertClick === true ? <Alert text={"질문을 작성해 주세요."} handleAlert={handleAlert} /> : null}
    <Header />
    <main>
      <ChatList />
      <div className='chat-room'>
        <div className='txt-box' ref={txtBoxDivRef}>
          <ul>
          {
          chatDBHistory !== undefined ?
            chatDBHistory.chatting_arr.ko_chat_arr.map((value, index)=>{
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
            })
          :<li>데이터가 없습니다. CSS 처리 해야됩니다.</li>
          }
          </ul>
          <div className='empty-box'></div>
        </div>
        <div className='chat-input-box'>
          <div className='chat-input-box-inner' ref={inputDivRef}>
            <textarea cols={85} rows={1} ref={inputTextRef}
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


export default Guest;