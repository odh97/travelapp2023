import React, { useState,useEffect } from 'react';
import '../../styles/components/developInfo/DevelopInfo.scss'

// components import
import Header from '../../_layout/Header';
// images
import infoStructure from '../../images/info-structure.png';
// icons
import { CiChat1,CiEdit,CiSquareCheck,CiSquareRemove,CiSquarePlus } from "react-icons/ci";
import { TbPencil } from "react-icons/tb";

// router
import { useNavigate } from 'react-router-dom';
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

function DevelopInfo(): JSX.Element {
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
<div className='developInfo'>
  {spinnerCheck ? <Spinner /> : null}
  <Header />
  <main className='developInfo-inner'>
      <div className='info-structure'>
        <h2>정보 구조도</h2>
        <img src={infoStructure} />
      </div>
      <div className='develop-version'>
        <h2>깃허브 개발 정보</h2>
        <ul>
          <li> 
            <h3>버전 : v 1.0.0</h3>
            <div>
              <p>안녕하세요 제가 오늘 작업한 내용입니다.</p>
            </div>
          </li>
          <li> 
            <h3>버전 : v 1.0.0</h3>
            <div>
              <p>
                안녕하세요 제가 오늘 작업한 내용입니다.
                <br/>
                <br/>
                안녕하세요 제가 오늘 작업한 내용입니다.
                <br/>
                <br/>
                안녕하세요 제가 오늘 작업한 내용입니다.안녕하세요 제가 오늘 작업한 내용입니다.
                안녕하세요 제가 오늘 작업한 내용입니다.안녕하세요 제가 오늘 작업한 내용입니다.
                안녕하세요 제가 오늘 작업한 내용입니다.안녕하세요 제가 오늘
              </p>
            </div>
          </li>
        </ul>
      </div>
  </main>
</div>
);
};



export default DevelopInfo;