import React from 'react';
import { CiChat1 } from "react-icons/ci";
import { TbPlus } from "react-icons/tb";
import { Link } from 'react-router-dom';

function ChatList(): JSX.Element {
  return (
    <div className='chat-list'>
      <ul>
        <li><Link to={"/"}><CiChat1 /><span>새로운 채팅</span></Link></li>
      </ul>
      <div className='chatroom-create-btn'><button><TbPlus /><span>New chat</span></button></div>
    </div>
  );
}

export default ChatList;