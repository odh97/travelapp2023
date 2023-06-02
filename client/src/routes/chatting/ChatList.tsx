import React, { useState } from 'react';
// icons
import { CiChat1,CiEdit,CiSquareCheck,CiSquareRemove } from "react-icons/ci";
import { TbPlus } from "react-icons/tb";
// router
import { Link } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { changeTitle } from "../../store/store"


// type 지정
type DBHistoryType = {
  id: null | string;
  name: null | string;
  title: string;
  chatting_arr: {
      ko_chat_arr: string[];
      en_chat_arr: string[];
  };
  Date: Date;
};

// Redux 상태의 루트 타입 정의
interface storeStateType {
  userChatArr: DBHistoryType[];

}

function ChatList(): JSX.Element {

  // redux setting
  let dispatch = useDispatch();
  const data = useSelector((state:storeStateType) => state);


  let [title, setTitle] = useState("");
  let [editButton, setEditButton] = useState(false);

  function titleEdit(id: null | number){
    dispatch(changeTitle({title, data:data.userChatArr, id}));
    setEditButton(false);
  }

  function newChat(){

  }

  // Redux 스토어의 데이터 선택

  return (
    <div className='chat-list'>
      <ul>
        <li>
          {editButton === false ?
          <div className='title-link'>
            <Link to={"/"}><CiChat1 /><span>{data.userChatArr.length === 0 ? null : data.userChatArr[0].title}</span></Link>
            {
              data.userChatArr.length === 0 ? null : (data.userChatArr[0].id === null
                ? <button className='title-edit-btn' onClick={()=>{setTitle(data.userChatArr[0].title); setEditButton(true);}}  style={{right : 10}}><CiEdit /></button>
                :
                <>
                  <button className='title-edit-btn' onClick={()=>{setTitle(data.userChatArr[0].title); setEditButton(true);}}><CiEdit /></button>
                  <button className='chat-room-delete' onClick={()=>{setEditButton(true)}}><CiSquareRemove /></button> {/* member 삭제 기능 */}
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
      <div className='chatroom-create-btn'><button onClick={newChat}><TbPlus /><span>New chat</span></button></div>
    </div>
  );
};

export default ChatList;