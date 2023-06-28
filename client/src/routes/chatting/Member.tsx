import React, {useRef, useState, useEffect} from 'react';
import '../../styles/components/chatting/ChatRoom.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';
import ChatList from './ChatList';
// icon 
import { CiUser,CiLocationArrow1 } from "react-icons/ci";
import { TbBrandTelegram } from "react-icons/tb";

// axios
import axios from 'axios';
// redux
import { useDispatch, useSelector } from "react-redux"
import { setState, chatUpdate, updateChatNumber } from "../../store/store"
import Spinner from '../../_layout/Spinner';
import { useNavigate } from 'react-router-dom';

// type 지정
type DBHistoryType = {
  id: null | number;
  name : null | string;
  title: string;
  chatting_arr: {
      ko_chat_arr: string[];
      en_chat_arr: string[];
  };
  date: Date;
};

// Redux 상태의 루트 타입 정의
interface storeStateType {
  userChatArr: DBHistoryType[];
  chatNumber: {target:number};
}

// window type 추적
declare global {
  interface Window {
    trackingData: string | number | object,
  }
}
function Member(): JSX.Element{
window.trackingData = "아직 데이터가 없습니다";
// navigate
const navigate = useNavigate();
// loading
let [spinnerCheck, setSpinnerCheck] = useState<boolean>(false);
// redux setting
let dispatch = useDispatch();
let storeState = useSelector((state:storeStateType) => state );
let storeDataSetting = false;
window.trackingData = storeState;

// 마운트
// 대화 내용 데이터 조회
useEffect(() => {
  // ajax 요청
  axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/member',{ withCredentials: true })
  .then((result)=>{
    console.log(result.data);
    if(result.data.authentication === 'failed') navigate('/error');
    let copy:DBHistoryType[] = result.data.chat_Data_Arr;
    
    if(storeDataSetting === false){
      dispatch(setState(copy));
      storeDataSetting = true;
    }
  })
  .catch((error)=>{console.log(error)});
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

// storeState 업데이트
useEffect(() => {
  // input 값 초기화
  setChatInputValue(``);
  inputTextRef.current!.style.height = '30px';
  inputDivRef.current!.style.height = '60px';
  
  // chatRoom scroll 최신 콘텐츠 위치로 이동
  if(txtBoxDivRef.current) txtBoxDivRef.current.scrollTop = txtBoxDivRef.current.scrollHeight;
  
}, [storeState]);

/* 채팅 기능 */
let [chatInputValue, setChatInputValue]= useState(``);

function chatBtnFn(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>){
  console.log("chatBtnFn 실행 체크");
  setSpinnerCheck(true);
  event.preventDefault();

  // 예외처리
  // 빈값과 스페이스 값만을 전송했을 경우
  if(!chatInputValue.trim() === true){
    setSpinnerCheck(false);
    return setAlertClick(true);
  }

  //POST data Data
  let storeState_copy = storeState.userChatArr[storeState.chatNumber.target];
  let newChatting = {
    ...storeState_copy,
    chatting_arr:
      {
        en_chat_arr : [...storeState_copy.chatting_arr.en_chat_arr],
        ko_chat_arr : [...storeState_copy.chatting_arr.ko_chat_arr,`user: ${chatInputValue.trim()}`]
      }
  }

  dispatch(chatUpdate({resultData : newChatting, index : storeState.chatNumber.target}));
  const postData = {
    userValue: `user: ${chatInputValue.trim()}`,
    chatDBHistory: storeState_copy,
  };

  // ajax 요청 진행
  axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/chatEnter', postData)
  .then((result)=>{
    let resultData = result.data.DB_chat_data;
    console.log(storeState.userChatArr[storeState.chatNumber.target]);
    dispatch(chatUpdate({resultData : resultData, index : storeState.chatNumber.target}));
    setSpinnerCheck(false);
  })
  .catch((error)=>{
    console.log(error);
  });

}
/* //채팅 기능 */


return (
<div className='chat'>
  {alertClick === true ? <Alert text={"질문을 작성해 주세요."} handleAlert={handleAlert} /> : null}
  {spinnerCheck === true ? <Spinner /> : null}
  <Header />
  <main>
    <ChatList />
    <div className='chat-room'>
      <div className='txt-box' ref={txtBoxDivRef}>
        <ul>
        {
        storeState.userChatArr[storeState.chatNumber.target] ?
        storeState.userChatArr[storeState.chatNumber.target].chatting_arr.ko_chat_arr.map((value, index)=>{
          if(value.indexOf("user:") !== -1){
            return(
            <li className='user' key={index}>
              <div className='icon-box'><CiUser/></div>
              <pre>{value.substring(value.indexOf("user:")+6)}</pre>
            </li>
            )
          }
          if(value.indexOf("AI:") !== -1){
            return(
              <li className='chat-bot' key={index}>
              <div className='icon-box'><TbBrandTelegram/></div>
              <pre>{value.substring(value.indexOf("AI:")+4)}</pre>
            </li>
            )
          }
        })
        :<li>새로운 대화를 만들어 채팅을 이용해 보세요!</li>
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


export default Member;