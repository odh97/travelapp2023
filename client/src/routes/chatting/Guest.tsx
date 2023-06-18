import React, {useRef, useState, useEffect} from 'react';
import '../../styles/components/chatting/ChatRoom.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';
import ChatList from './ChatList';
import Spinner from '../../_layout/Spinner';

// icon 
import { CiChat2,CiPaperplane,CiUser,CiFolderOn,CiLocationArrow1 } from "react-icons/ci";
import { TbBrandTelegram } from "react-icons/tb";

// axios
import axios from 'axios';
// redux
import { useDispatch, useSelector } from "react-redux"
import { setState, chatUpdate, changeTitle } from "../../store/store"

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
}

// window type 추적
declare global {
  interface Window {
    trackingData: string | number | object,
  }
}



function Guest(): JSX.Element{
  window.trackingData = "아직 데이터가 없습니다";

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
    let getLocalStorage = localStorage.getItem('chatRoom_local_obj');
    
    // 로컬 데이터 조회
    if(getLocalStorage !== null){
      let chatRoom_local_obj = JSON.parse(getLocalStorage);
      
      if(storeDataSetting === false){
        dispatch(setState([chatRoom_local_obj]));
        storeDataSetting = true;
    }
    } else{
      // ajax 요청
      axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/basicChatData')
      .then((result)=>{
        let copy:DBHistoryType[] = result.data.basic_chat_data;

        if(storeDataSetting === false){
          dispatch(setState(copy));
          storeDataSetting = true;
        }
      })
      .catch((error)=>{console.log(error)});
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
    setSpinnerCheck(true);
    console.log("chatBtnFn 실행 체크");
    // 예외처리
    event.preventDefault();
    if(!chatInputValue.trim() === true) return setAlertClick(true); // 빈값과 스페이스 값만을 전송했을 경우
    //POST data Data
    let storeState_copy = storeState.userChatArr[0];
    let newChatting = {
      ...storeState_copy,
      chatting_arr:
        {
          en_chat_arr : [...storeState_copy.chatting_arr.en_chat_arr],
          ko_chat_arr : [...storeState_copy.chatting_arr.ko_chat_arr,`user: ${chatInputValue.trim()}`]
        }
    }
  
    dispatch(chatUpdate({resultData : newChatting, index : 0}));
    const postData = {
      userValue: `user: ${chatInputValue.trim()}`,
      chatDBHistory: storeState_copy,
    };
  
    // ajax 요청 진행
    axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/chatEnter', postData)
    .then((result)=>{
      let resultData = result.data.DB_chat_data;
      console.log(storeState.userChatArr[0]);
      dispatch(chatUpdate({resultData : resultData, index : 0}));
      setSpinnerCheck(false);
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
      if(storeState.userChatArr[0]){
        if(storeState.userChatArr[0].id === null){
          localStorage.setItem("chatRoom_local_obj",JSON.stringify(storeState.userChatArr[0]));
        }
      }
    }
  },[storeState]);


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
          storeState.userChatArr[0] !== undefined ?
            storeState.userChatArr[0].chatting_arr.ko_chat_arr.map((value, index)=>{
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