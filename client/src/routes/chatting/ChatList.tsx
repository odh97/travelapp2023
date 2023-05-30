import React, { useState } from 'react';
// icons
import { CiChat1,CiEdit,CiSquareCheck,CiSquareRemove } from "react-icons/ci";
import { TbPlus } from "react-icons/tb";
// router
import { Link } from 'react-router-dom';


function ChatList(): JSX.Element {

  let [title, setTitle] = useState("새로운 채팅");

  function titleEdit(){

  }

  return (
    <div className='chat-list'>
      <ul>
        <li>
          <div className='title-link' style={{display : 'none'}}>
            <Link to={"/"}>
              <CiChat1 />
              <span>새로운 채팅</span>
            </Link>
            <button className='title-edit-btn' onClick={()=>{titleEdit()}}><CiEdit /></button>
          </div>
          <div className='title-edit-box'>
            <input value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <button onClick={()=>{titleEdit()}}><CiSquareCheck /></button>
            <button onClick={()=>{titleEdit()}}><CiSquareRemove /></button>
          </div>
        </li>
      </ul>
      <div className='chatroom-create-btn'><button><TbPlus /><span>New chat</span></button></div>
    </div>
  );
}

export default ChatList;