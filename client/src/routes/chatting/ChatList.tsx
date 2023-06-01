import React, { useState } from 'react';
// icons
import { CiChat1,CiEdit,CiSquareCheck,CiSquareRemove } from "react-icons/ci";
import { TbPlus } from "react-icons/tb";
// router
import { Link } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';


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

// Redux 상태의 루트 타입 정의
interface storeStateType {
  userChatArr: DBHistoryType[];

}

function ChatList(): JSX.Element {
  // redux setting
  const data = useSelector((state:storeStateType) => state);
  // console.log(data);

  let [title, setTitle] = useState("새로운 채팅");
  let [editButton, setEditButton] = useState(false);

  function titleEdit(){

  }

  function newChat(){

  }

  // Redux 스토어의 데이터 선택

  return (
    <div className='chat-list'>
      <ul>
        <li>
          {editButton === false ?
          <div className='title-link'>
            <Link to={"/"}><CiChat1 /><span>새로운 채팅</span></Link>
            <button className='title-edit-btn' onClick={()=>{setEditButton(true)}}><CiEdit /></button>
            <button className='chat-room-delete' onClick={()=>{setEditButton(true)}}><CiSquareRemove /></button>{/* 회전 전용 채팅 삭제 기능 (미적용) */}
          </div>
          :
          <div className='title-edit-box'>
            <input value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <button onClick={()=>{titleEdit()}}><CiSquareCheck /></button> {/* redux 데이터 수정 버튼 (미적용) */}
            <button onClick={()=>{setEditButton(false)}}><CiSquareRemove /></button>
          </div>
          }
        </li>
      </ul>
      <div className='chatroom-create-btn'><button onClick={newChat}><TbPlus /><span>New chat</span></button></div>
    </div>
  );
};

export default ChatList;