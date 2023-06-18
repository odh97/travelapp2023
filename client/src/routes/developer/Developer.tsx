import React, { useState,useEffect } from 'react';
import '../../styles/components/developer/Developer.scss'

// components import
import Header from '../../_layout/Header';
// images
import myimg from '../../images/myimg.jpg'
import Github from '../../images/icon/github-icon.png'
import Notion from '../../images/icon/Notion-logo.png'
// icons
import { CiChat1,CiEdit,CiSquareCheck,CiSquareRemove,CiSquarePlus } from "react-icons/ci";
import { TbPencil } from "react-icons/tb";

// router
import { Link, useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { newState, changeTitle, deleteData, updateChatNumber } from "../../store/store";
// axios
import axios from 'axios';
import Spinner from '../../_layout/Spinner';

// DB 구조
// id : post id값
// name : user.id
// title : 대제목
// mainText : 본문
// date : 날짜

function Developer(): JSX.Element {
// navigate
const navigate = useNavigate();
// redux setting
let dispatch = useDispatch();
// const storeData = useSelector((state:storeStateType) => state);

// 타이틀 변경
let [title, setTitle] = useState<string>("");
let [spinnerCheck, setSpinnerCheck] = useState<boolean>(false);

// axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/basicChatData', { withCredentials: true })
// .then((result)=>{
//   let basic_chat_data:DBHistoryType[] = result.data.basic_chat_data;
//   dispatch(newState({id : storeData.userChatArr[0].id, data : basic_chat_data}));
// })
// .catch((error)=>{console.log(error)});


// storeData 업데이트 리렌더링
useEffect(()=>{
},[]);



return (
<div className='developer'>
  {spinnerCheck ? <Spinner /> : null}
  <Header />
  <main className='developer-inner'>
      <div className='developer-info'>
        <h2>개발자 정보</h2>
        <img src={myimg} />
        <div className='blog-link'>
          <Link to={'https://github.com/odh97'} target="_blank">
            <img src={Github} />
            Github
          </Link>
          <Link to={'https://www.notion.so/TIL-Today-I-Learned-bca75cfcd1b14d868eb507d726ca8825?pvs=4'} target="_blank">
            <img src={Notion} />
            Notion
          </Link>
        </div>
        <div className='profile'>
          <div className='my'></div>
          <div className='phone'></div>
          <div className='email'></div>
          <div className='address'></div>
          <p>이름: 오대현</p>
          <p>생년월일: 1997.07.04</p>
          <p>연락처: 010-9786-9700</p>
          <p>이메일: xzdheogus1@naver.com</p>
          <p>주소지: 서울특별시 관악구</p>
        </div>
      </div>
  </main>
</div>
);
};



export default Developer;