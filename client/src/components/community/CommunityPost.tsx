import React, { useState,useEffect } from 'react';
import '../../styles/components/community/CommunityPost.scss'

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


function CommunityPost(): JSX.Element {
// navigate
const navigate = useNavigate();
// redux setting
let dispatch = useDispatch();
// const storeData = useSelector((state:storeStateType) => state);CommunityPost

// 타이틀 변경

// axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/basicChatData', { withCredentials: true })
// .then((result)=>{
//   let basic_chat_data:DBHistoryType[] = result.data.basic_chat_data;
//   dispatch(newState({id : storeData.userChatArr[0].id, data : basic_chat_data}));
// })
// .catch((error)=>{console.log(error)});


// storeData 업데이트 리렌더링
useEffect(()=>{
},[]);

let [titleInput, setTitleInput] = useState<string>('');
let [mainTextInput,  setMainTextInput] = useState<string>('');


// DB 구조
// id : post id값
// name : user.id
// title : 대제목
// mainText : 본문
// date : 날짜

return (
<div className='CommunityPost'>
  <Header />
  <main className='CommunityPost-inner'>
    <h2>게시글 제목 하드코딩</h2>
    <div className='post-info'>
      <span className='post-name'>user name</span>
      <span className='post-date'>날짜 : date</span>
    </div>
    <div className='mainText'>mainText</div>
  </main>
</div>
);
};



export default CommunityPost;