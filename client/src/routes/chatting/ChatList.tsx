import React, { useState,useEffect } from 'react';
// icons
import { CiChat1,CiEdit,CiSquareCheck,CiSquareRemove,CiSquarePlus } from "react-icons/ci";
import { HiArrowPath } from "react-icons/hi2";

// router
import { Link } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setState, newState, changeTitle,updateChatNumber } from "../../store/store";
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
  chatNumber: number;
}

function ChatList(): JSX.Element {

// 타이틀 변경
let [title, setTitle] = useState<string>("");
const [editNumber, setEditNumber] = useState<number | null>(null);

function titleEdit(id: null | number){
  dispatch(changeTitle({title, data:storeData.userChatArr, id}));
  setEditNumber(null);
}

// redux setting
let dispatch = useDispatch();
const storeData = useSelector((state:storeStateType) => state);

function newChat(){
  // ajax 요청
  axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/basicChatData')
  .then((result)=>{
    let basic_chat_data:DBHistoryType[] = result.data.basic_chat_data;
    dispatch(newState({id : storeData.userChatArr[0].id, data : basic_chat_data}));
  })
  .catch((error)=>{console.log(error)});
}
function newChatAdd(){
  // ajax 요청
  axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/newChatAdd', null, { withCredentials: true })
  .then((result)=>{
    let copy:DBHistoryType[] = result.data.basic_chat_data;
    dispatch(newState({id : storeData.userChatArr[0].id, data : copy}));
    console.log(storeData);
  })
  .catch((error)=>{console.log(error)});
}
function listCheck(index:number){
  dispatch(updateChatNumber(index));
}
// storeData 업데이트 리렌더링
useEffect(()=>{
},[storeData]);
return (
  <div className='chat-list'>
    <ul>
    {
    storeData.userChatArr.map((value, index)=>{
      return(
      editNumber !== index
      ?
      <li key={index}>
        <div className='title-link'>
          {/* to={"/member/"+value.id}  */}
          <button onClick={()=>{listCheck(index)}} ><CiChat1 /><span>{value.title} {value.id}</span></button>
          {
            value.id === null
            ? <button className='title-edit-btn' onClick={()=>{setTitle(value.title); setEditNumber(index);}}  style={{right : 10}}><CiEdit /></button>
            :
            <>
              <button className='title-edit-btn' onClick={()=>{setTitle(value.title); setEditNumber(index);}}><CiEdit /></button>
              {/* member 삭제 기능 */}
              <button className='chat-room-delete' onClick={()=>{/* 삭제 기능 */}}><CiSquareRemove /></button>
            </>
          }
        </div>
      </li>
      :
      <li key={index}>
        <div className='title-edit-box'>
          <input value={title} onChange={(e)=>{setTitle(e.target.value)}} />
          <button onClick={()=>{titleEdit(value.id)}}><CiSquareCheck /></button>
          <button onClick={()=>{setEditNumber(null)}}><CiSquareRemove /></button>
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
  </div>
);
};



export default ChatList;