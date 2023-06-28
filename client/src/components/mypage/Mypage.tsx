import React, { useState,useEffect } from 'react';
import '../../styles/components/mypage/Mypage.scss'

// components import
import Header from '../../_layout/Header';
// icons
import { CiUser } from "react-icons/ci";
import { TbCamera } from "react-icons/tb";

// router
import { useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';

function Mypage(): JSX.Element {
// navigate
const navigate = useNavigate();

// 타이틀 변경
let [userData, setUserData] = useState<{userid:string}>();

// storeData 업데이트 리렌더링
useEffect(()=>{
axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/GETmypage', { withCredentials: true })
.then((result)=>{
  if(result.data.authentication === 'failed') navigate('/login');
  setUserData(result.data);
})
.catch((error)=>{console.log(error)});
},[]);

function logoutHandle(){
  axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/logout', { withCredentials: true })
  .then((result)=>{
    if(result.data.message === 'success'){
      navigate('/guest');
    }
  })
  .catch((error)=>{
    console.log(error);
  });
}

return (
<div className='mypage'>
  <Header />
  <main className='mypage-inner'>
    <h2>마이 페이지</h2>
    <div className='user-profile'>
      <button className='user-img'>{false ? '' : <CiUser />}</button>
      <button className='user-img-icon'><TbCamera /></button>
      <span className='user-name'>
      {
          userData
          ? userData.userid
          : null
        }
      </span>
    </div>
    <table>
      <tr>
        <th>커뮤니티</th>
        <td onClick={()=>{navigate('/community/my')}}>게시글 관리</td>
      </tr>
      <tr>
        <th>어플리케이션 정보</th>
        <td onClick={()=>{navigate('/developInfo')}}>개발 정보</td>
        <td onClick={()=>{navigate('/developer')}}>개발자 정보</td>
      </tr>
      <tr className='user-logout'>
        <td><button onClick={logoutHandle}>로그아웃</button></td>
      </tr>
    </table>
  </main>
</div>
);
};



export default Mypage;