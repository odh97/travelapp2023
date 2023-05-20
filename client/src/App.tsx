import React from 'react';
import "./App.scss";
// Route
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';

// components import
import ChatRoom from './routes/ChatRoom';
import Login from './routes/login/Login';
import Register from './routes/login/Register';


function App(): JSX.Element{
  return (
  <div className="App">
    <Routes>
      <Route path='/:id' element={<ChatRoom />} />
      <Route path='/login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path="*" element={ <div>없는페이지임</div> } />
    </Routes>
  </div>
  );
}

export default App;