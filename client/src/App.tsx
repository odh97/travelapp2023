import React from 'react';
import "./App.scss";
// Route
import {Routes, Route} from 'react-router-dom';

// components import
import Guest from './routes/chatting/Guest';
import Member from './routes/chatting/Member';

import Community from './routes/community/Community';
import CommunityWrite from './components/community/CommunityWrite';

import Login from './routes/login/Login';
import Register from './routes/login/Register';
import Mypage from './components/mypage/Mypage';

import NotFound from './_layout/NotFound';
import Copy from './routes/copy';

function App(): JSX.Element{
  return (
  <div className="App">
    <Routes>
      {/* 메인 페이지 */}
      <Route path='/guest' element={<Guest />} />
      <Route path='/member/:id' element={<Member />} />
      <Route path='/community' element={<Community />} />
      <Route path='/community/write' element={<CommunityWrite />} />
      {/* 로그인 관련 페이지 */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/mypage' element={<Mypage />} />
      {/* 404page */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
  );
}

export default App;