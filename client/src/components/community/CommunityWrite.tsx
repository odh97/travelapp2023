import React, { useState,useEffect } from 'react';
import '../../styles/components/community/CommunityWrite.scss'

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

function CommunityWrite(): JSX.Element {
// navigate
const navigate = useNavigate();
// redux setting
let dispatch = useDispatch();
// const storeData = useSelector((state:storeStateType) => state);

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


function handleSubmit(event:React.MouseEvent){
  event.preventDefault();
}

return (
<div className='communityWrite'>
  <Header />
  <main className='communityWrite-inner'>
    <h2>게시글 작성</h2>
    <div className='communityWrite-formBox'>
      <input type='text' value={titleInput} onChange={(e)=>{setTitleInput(e.target.value)}} placeholder='제목' name='id'/>
      <textarea  value={mainTextInput} onChange={(e)=>{setMainTextInput(e.target.value)}} placeholder='내용을 입력하세요.' name='pw' />
      <button onClick={(e)=>{handleSubmit(e)}}>게시물 등록</button>
    </div>
  </main>
</div>
);
};



export default CommunityWrite;