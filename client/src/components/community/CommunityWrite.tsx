import React, { useState,useEffect } from 'react';
import '../../styles/components/community/CommunityWrite.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';

// router
import { useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';

function CommunityWrite(): JSX.Element {
// alert 컴포넌트
let [alertText, setAlertText] = useState('');
let [alertClick, setAlertClick] = useState(false);
function handleAlert(){setAlertClick(false);}
// navigate
const navigate = useNavigate();


let [titleInput, setTitleInput] = useState<string>('');
let [mainTextInput,  setMainTextInput] = useState<string>('');


function handleSubmit(event:React.MouseEvent){
  event.preventDefault();

  if(!titleInput.trim() === true || !mainTextInput.trim() === true){
  setAlertText('게시글을 작성해 주세요.');
  return setAlertClick(true);
  }

  const axiosData = {
    title: titleInput,
    mainText: mainTextInput,
  }
  axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/POSTcommunity',axiosData, { withCredentials: true })
  .then((result)=>{
    console.log(result);
    // 실패
    if(result.data.result === 'failure'){
      setAlertText('로그인 후 이용해 주세요.');
      setAlertClick(true);
    }
    // 성공
    if(result.data.result === 'success') navigate('/community');

  })
  .catch((error)=>{console.log(error)});
}

return (
<div className='communityWrite'>
  {alertClick === true ? <Alert text={alertText} handleAlert={handleAlert} /> : null}
  <Header />
  <main className='communityWrite-inner'>
    <h2>게시글 작성</h2>
    <div className='communityWrite-formBox'>
      <input type='text' value={titleInput} onChange={(e)=>{setTitleInput(e.target.value)}} placeholder='제목' name='id' maxLength={60}/>
      <textarea value={mainTextInput} onChange={(e)=>{setMainTextInput(e.target.value)}} placeholder='내용을 입력하세요.' name='pw' />
      <button onClick={(e)=>{handleSubmit(e)}}>게시물 등록</button>
    </div>
  </main>
</div>
);
};



export default CommunityWrite;