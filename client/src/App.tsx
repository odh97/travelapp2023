import React from 'react';
import "./App.scss";
// Route
import {Routes, Route} from 'react-router-dom';

// components import
import Guest from './routes/chatting/Guest';
import Member from './routes/chatting/Member';
import Login from './routes/login/Login';
import Register from './routes/login/Register';
import Copy from './routes/copy';
import NotFound from './_layout/NotFound';

function App(): JSX.Element{
  return (
  <div className="App">
    <Routes>
      <Route path='/guest' element={<Guest />} />
      <Route path='/member/:id' element={<Member />} />
      <Route path='/login' element={<Login />} />
      <Route path='/mypage' element={<Copy />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
  );
}

export default App;