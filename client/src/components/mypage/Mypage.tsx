import React, { useState,useEffect } from 'react';
import '../../styles/components/mypage/Mypage.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';
// icons
import { CiUser } from "react-icons/ci";
import { TbCamera } from "react-icons/tb";

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

function Mypage(): JSX.Element {
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
<div className='mypage'>
  <Header />
  <main className='mypage-inner'>
    <h2>마이 페이지</h2>
    <div className='user-profile'>
      <button className='user-img'>{false ? '' : <CiUser />}</button>
      <button className='user-img-icon'><TbCamera /></button>
      <span className='user-name'>이름 하드코딩</span>
    </div>
    <table>
      <tr>
        <th>커뮤니티</th>
        <td>게시글 관리(클릭 이벤트 미적용 상태)</td>
      </tr>
    </table>
  </main>
</div>
);
};



export default Mypage;