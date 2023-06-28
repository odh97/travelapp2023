import React, { useState,useEffect } from 'react';
import '../../styles/components/community/CommunityPost.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';
// icon
import { TbChevronRight } from "react-icons/tb";


// router
import { useNavigate, useParams } from 'react-router-dom';
// axios
import axios from 'axios';

type CommunityPostType = {
  _id:string,
  id:number,
  name:string,
  title:string,
  text:string,
  date:string,
}

function CommunityPost(): JSX.Element {
// alert 컴포넌트
let [alertClick, setAlertClick] = useState(false);
function handleAlert(){setAlertClick(false);}
// params
const params = useParams();
// navigate
const navigate = useNavigate();

let [communityPostData, setCommunityPostData] = useState<CommunityPostType>();
let [loginUser, setloginUser] = useState(null);
useEffect(()=>{
  axios.get(process.env.REACT_APP_LOCAL_SERVER_URL + '/GETcommunityDetail', {params: { paramsId: params.id },withCredentials: true})
    .then((result) => {
      console.log(result);
      setloginUser(result.data.loginUser);
      setCommunityPostData(result.data.result);
    })
    .catch((error) => {
      console.log(error);
    });
},[]);

function handleDelete(){

  let pramData = {
    paramsId: params.id,
    userId: loginUser,
  }

  axios.delete(process.env.REACT_APP_LOCAL_SERVER_URL + '/DELETEcommunityPost', {params : pramData, withCredentials: true})
  .then((result) => {
    if(result.data.message === "success") navigate('/community');
    if(result.data.message === "failure") setAlertClick(true);
  })
  .catch((error) => {
    console.log(error);
  });
}

// mobile

return (
<div className='CommunityPost'>
  {alertClick === true ? <Alert text={'유저 정보가 일치하지 않습니다. 나중에 다시 시도해주세요.'} handleAlert={handleAlert} /> : null}
  <Header />
  <main className='CommunityPost-inner'>
    {communityPostData === undefined
      ? null
      : <>
        <div className='mobile-box'>
          <button className='backspace' onClick={() => navigate(-1)}><TbChevronRight /></button>
          <h2>{communityPostData.title}</h2>
            {
              communityPostData.name === loginUser
              ? <button className='delete-btn' onClick={handleDelete}>삭제하기</button>
              : null
            }
        </div>
        <div className='title'>
          <h2>{communityPostData.title}</h2>
          {
            communityPostData.name === loginUser
            ? <button className='delete-btn' onClick={handleDelete}>삭제하기</button>
            : null
          }
        </div>
        <div className='post-info'>
          <span className='post-name'>이름 : {communityPostData.name}</span>
          <span className='post-date'>No.{communityPostData.id} | {communityPostData.date}</span>
        </div>
        <pre className='mainText'>{communityPostData.text}</pre>
      </>
    }

  </main>
</div>
);
};



export default CommunityPost;