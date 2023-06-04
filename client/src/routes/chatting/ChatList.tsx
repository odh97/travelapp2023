import React, { useState } from 'react';
// icons
import { CiChat1,CiEdit,CiSquareCheck,CiSquareRemove,CiSquarePlus } from "react-icons/ci";
import { HiArrowPath } from "react-icons/hi2";

// router
import { Link } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { newState, changeTitle } from "../../store/store";
// axios
import axios from 'axios';


// type 지정
type DBHistoryType = {
  id: null | number;
  name: null | string;
  title: string;
  chatting_arr: {
      ko_chat_arr: string[];
      en_chat_arr: string[];
  };
  date: Date;
};

// Redux 상태의 루트 타입 정의
interface storeStateType {
  userChatArr: DBHistoryType[];
}

function ChatList(): JSX.Element {

  // redux setting
  let dispatch = useDispatch();
  const storeData = useSelector((state:storeStateType) => state);


  let [title, setTitle] = useState("");
  let [editButton, setEditButton] = useState(false);

  function titleEdit(id: null | number){
    dispatch(changeTitle({title, data:storeData.userChatArr, id}));
    setEditButton(false);
  }

  function newChat(){
    // ajax 요청
    axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/guest')
    .then((result)=>{
      let basic_chat_data:DBHistoryType[] = result.data.basic_chat_data;
      dispatch(newState({id : storeData.userChatArr[0].id, data : basic_chat_data}));
    })
    .catch((error)=>{console.log(error)});
  }

  // Redux 스토어의 데이터 선택

  return (
    <div className='chat-list'>
      <ul>
        <li>
          {editButton === false ?
          <div className='title-link'>
            <Link to={"/"}><CiChat1 /><span>{storeData.userChatArr.length === 0 ? null : storeData.userChatArr[0].title}</span></Link>
            {
              storeData.userChatArr.length === 0 ? null : (storeData.userChatArr[0].id === null
                ? <button className='title-edit-btn' onClick={()=>{setTitle(storeData.userChatArr[0].title); setEditButton(true);}}  style={{right : 10}}><CiEdit /></button>
                :
                <>
                  <button className='title-edit-btn' onClick={()=>{setTitle(storeData.userChatArr[0].title); setEditButton(true);}}><CiEdit /></button>
                  {/* member 삭제 기능 */}
                  <button className='chat-room-delete' onClick={()=>{setEditButton(true)}}><CiSquareRemove /></button>
                </>
              )
            }
          </div>
          :
          <div className='title-edit-box'>
            <input value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <button onClick={()=>{titleEdit(null)}}><CiSquareCheck /></button>
            <button onClick={()=>{setEditButton(false)}}><CiSquareRemove /></button>
          </div>
          }
        </li>
      </ul>
      {/* member 새로운 채팅방 추가 기능 */}
      {
        storeData.userChatArr.length === 0 ? null : (storeData.userChatArr[0].id === null
          ? <div className='chatroom-create-btn'><button onClick={newChat}><HiArrowPath /><span>새로운 채팅방</span></button></div>
          : <div className='chatroom-create-btn'><button onClick={newChat}><CiSquarePlus /><span>채팅방 추가</span></button></div>
        )
      }
      
    </div>
  );
};

export default ChatList;