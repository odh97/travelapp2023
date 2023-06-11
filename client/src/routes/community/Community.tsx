import React, { useState,useEffect } from 'react';
import '../../styles/components/community/Community.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';
// icons
import { CiChat1,CiEdit,CiSquareCheck,CiSquareRemove,CiSquarePlus } from "react-icons/ci";
import { HiArrowPath } from "react-icons/hi2";

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

function Community(): JSX.Element {
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
<div className='community'>
  <Header />
  <main className='community-inner'>
    <ul>
      {/* 클릭하면 해당 페이지로 이동 */}
      <li> 
        <h2>제목 : title</h2>
        <span>작성자 : name</span>
        {/* <span>작성 번호 : id</span> */}
        <p>본문 : mainText</p>
      </li>
      <li>
        <h2>제목 : title</h2>
        <span>작성자 : name</span>
        {/* <span>작성 번호 : id</span> */}
        <p>본문 : mainText</p>
      </li>
      <li>
        <h2>제목 : title</h2>
        <span>작성자 : name</span>
        {/* <span>작성 번호 : id</span> */}
        <p>본문 : mainText</p>
      </li>
      <li>
        <h2>제목 : title</h2>
        <span>작성자 : name</span>
        {/* <span>작성 번호 : id</span> */}
        <p>본문 : mainText</p>
      </li>
      <li>
        <h2>제목 : title</h2>
        <span>작성자 : name</span>
        {/* <span>작성 번호 : id</span> */}
        <p>본문 : mainText</p>
      </li>
      <li>
        <h2>제목 : title</h2>
        <span>작성자 : name</span>
        {/* <span>작성 번호 : id</span> */}
        <p>본문 : mainText</p>
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
  </main>
</div>
);
};



export default Community;