import React from 'react';
import '../styles/components/ChatRoom.scss'

// components import
import Header from '../_layout/Header';
import Footer from '../_layout/Footer';

// icon
import { BsFillAirplaneFill } from "react-icons/bs";

function ChatRoom(): JSX.Element{
  return (
  <div className='chat'>
    <Header />
    <main>
      <ChatList />
      <div className='chat-room'>
        <div className='txt-box'>
          <ul>
          <li>대화내용</li>
          <li>대화내용</li>
          <li>대화내용</li>
          <li><BsFillAirplaneFill/></li>
          </ul>
        </div>
        <div className='empty-box'>빈공간</div>
      </div>
    </main>
  </div>
  )
}

function ChatList(): JSX.Element{
  return (
  <div className='chat-list'>
    <ul>
      <li>chat item</li>
      <li>chat item</li>
      <li>chat item</li>
      <li>chat item</li>
      <li>chat item</li>
      <li>chat item</li>
    </ul>
    <div>chatroom-create-btn</div>
  </div>
  )
}

// export {DscrpTab, QandATab, ReviewTab}; //여러개 내보낼때

export default ChatRoom;