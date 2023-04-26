import React from 'react';

// components import
import Header from '../_layout/Header';
import Footer from '../_layout/Footer';

function ChatRoom(): JSX.Element{
  return (
    <div className='chatRoom-container'>
      <Header />
      <main></main>
      <Footer />
    </div>
  )
}

export default ChatRoom;