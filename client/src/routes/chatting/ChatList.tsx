import React, { useState,useEffect } from 'react';
// icons
import { CiChat1,CiEdit,CiSquareCheck,CiSquareRemove,CiSquarePlus } from "react-icons/ci";
import { HiArrowPath } from "react-icons/hi2";
import { TbChevronRight } from "react-icons/tb";

// router
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { newState, changeTitle, deleteData, updateChatNumber } from "../../store/store";
// axios
import axios from 'axios';


// type 지정
type DBHistoryType = {
  id: null | number;
  name: null | string;
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

function ChatList(): JSX.Element {
// navigate
const navigate = useNavigate();
// redux setting
let dispatch = useDispatch();
const storeData = useSelector((state:storeStateType) => state);

// 타이틀 변경
let [title, setTitle] = useState<string>("");
const [editNumber, setEditNumber] = useState<number | null>(null);

function titleEdit(id: null | number){
  dispatch(changeTitle({title, data:storeData.userChatArr, id}));
  setEditNumber(null);
}
function newChat(){
  // ajax 요청
  axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/basicChatData')
  .then((result)=>{
    let basic_chat_data:DBHistoryType[] = result.data.basic_chat_data;
    dispatch(newState({id : storeData.userChatArr[0].id, data : basic_chat_data}));
  })
  .catch((error)=>{console.log(error)});
}
let [chatAddClass, setChatAddClass] = useState<boolean>(false);
function newChatAdd(){
  // ajax 요청
  axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/newChatAdd', null, { withCredentials: true })
  .then((result)=>{
    let copy:DBHistoryType[] = result.data.basic_chat_data;
    dispatch(newState({id : storeData.userChatArr[0].id, data : copy}));
    setChatAddClass(true);
    setTimeout(()=>{setChatAddClass(false)},600);
    dispatch(updateChatNumber(storeData.chatNumber.target+1));
  })
  .catch((error)=>{console.log(error)});
}
let [deleteNumber, setDeleteNumber] = useState<number | null>(null);
function deleteChat(id:number | null, name:string | null, index:number){

  setTimeout(()=>{
    if(typeof(id) === 'number' && typeof(name) === 'string'){
      axios.delete(process.env.REACT_APP_LOCAL_SERVER_URL+'/chatDelete',{
        data : {
          id: id,
          name: name,
        },
        withCredentials: true,
      })
      .then((result)=>{
        dispatch(deleteData(index));
      })
      .catch((error)=>{
        console.log(error);
        setDeleteNumber(null);
      });
    }
  },300);
}
function listCheck(index:number, valueID:number | null){
  if(valueID === null) return false

  setMobileTitle(index);
  dispatch(updateChatNumber(index));
  navigate('/member/'+valueID);
}
// storeData 업데이트 리렌더링
useEffect(()=>{
  if(typeof(deleteNumber) === 'number'){
    setDeleteNumber(null);
    
    let URL_ID: (number | string) = window.location.pathname.replace("/member/","");
    const index = storeData.userChatArr.findIndex(obj => obj.id === Number(URL_ID));
    if(index === -1){
      dispatch(updateChatNumber(0));
      navigate('/member/'+storeData.userChatArr[0].id);
    }
    if(index !== -1){
      dispatch(updateChatNumber(index));
      navigate('/member/'+URL_ID);
    }
  }
},[storeData]);

// mobile
const [mobileTitle, setMobileTitle] = useState<number>(0);
const [mobileControl, setMobileControl] = useState<boolean>(false);
return (
  <div className={mobileControl === false ? 'chat-list' : 'chat-list mobile-control'}>
    <ul>
    {
    storeData.userChatArr.map((value, index)=>{
      return(
      editNumber !== index
      ?
      <li key={index} className={deleteNumber === index ? 'fade-out' : (chatAddClass ? 'addItem' : '')}>
        <div className='title-link'  onClick={()=>{setMobileControl(!mobileControl); listCheck(index, value.id);}}>
          <button><CiChat1 /><span>{value.title}</span></button>
          {
            value.id === null
            ? <button className='title-edit-btn' onClick={(e)=>{e.stopPropagation(); setTitle(value.title); setEditNumber(index);}}  style={{right : 10}}><CiEdit /></button>
            :
            <>
              <button className='title-edit-btn' onClick={(e)=>{e.stopPropagation(); setTitle(value.title); setEditNumber(index);}}><CiEdit /></button>
              <button className='chat-room-delete' onClick={(e)=>{e.stopPropagation(); deleteChat(value.id, value.name, index)}}><CiSquareRemove /></button>
            </>
          }
        </div>
      </li>
      :
      <li key={index}>
        <div className='title-edit-box'>
          <input value={title} onChange={(e)=>{e.stopPropagation(); setTitle(e.target.value)}} />
          <button onClick={(e)=>{e.stopPropagation(); titleEdit(value.id)}}><CiSquareCheck /></button>
          <button onClick={(e)=>{e.stopPropagation(); setEditNumber(null)}}><CiSquareRemove /></button>
        </div>
      </li>
      )
    })
    }
    </ul>
    {
      storeData.userChatArr.length === 0 ? null :
      (storeData.userChatArr[0].id === null
        ? <div className='chatroom-create-btn'><button onClick={newChat}><HiArrowPath /><span>새로운 채팅방</span></button></div>
        : <div className='chatroom-create-btn'><button onClick={newChatAdd}><CiSquarePlus /><span>채팅방 추가</span></button></div>
      )
    }
    <div className='mobile-box'>
      <button onClick={()=>{setMobileControl(!mobileControl);}}><TbChevronRight /></button>
      <h2>{storeData.userChatArr[0] !== undefined ? storeData.userChatArr[mobileTitle].title : null}</h2>
      <div></div>
    </div>
  </div>
);
};



export default ChatList;