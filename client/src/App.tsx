import React from 'react';
import "./App.scss";
// Route
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';

// components import
import ChatRoom from './routes/ChatRoom';



function App(): JSX.Element{
  return (
  <div className="App">
    <Routes>
      <Route path='/' element={<ChatRoom />} />
    </Routes>
  </div>
  );
}

export default App;