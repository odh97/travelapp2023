import React, { useState,useEffect } from 'react';
import '../../styles/components/community/CommunityMy.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';
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

// DB 구조
// id : post id값
// name : user.id
// title : 대제목
// mainText : 본문
// date : 날짜

function CommunityMy(): JSX.Element {
// navigate
const navigate = useNavigate();
// redux setting
let dispatch = useDispatch();
// const storeData = useSelector((state:storeStateType) => state);

// 타이틀 변경
let [title, setTitle] = useState<string>("");

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
<div className='CommunityMy'>
  <Header />
  <main className='CommunityMy-inner'>
    <div className='CommunityMy-post-box'>
    <h2>나의 게시글</h2>
      <ul>
        <li> 
          <h3>제목 : 시퀀스 다이어 그램 작성</h3>
          <div className='post-info'>
            <span>작성자 : kim</span>
            <span>2023년 6월 12일</span>
          </div>
          {/* <span>작성 번호 : id</span> */}
          <p>안녕하세요 제가 오늘 작업한 내용입니다.</p>
        </li>
        {
          /* {storeData.userChatArr.map((value, index)=>{
          return(
          <li key={index} className={deleteNumber === index ? 'fade-out' : (chatAddClass ? 'addItem' : '')}>
          </li>
          )
          })} */
        }
      </ul>
    </div>
  </main>
</div>
);
};



export default CommunityMy;