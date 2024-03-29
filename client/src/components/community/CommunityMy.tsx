import React, { useState,useEffect, useRef } from 'react';
import '../../styles/components/community/CommunityMy.scss'

// components import
import Header from '../../_layout/Header';
// icons
import { TbPencil,TbChevronLeft,TbChevronRight } from "react-icons/tb";

// router
import { useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';

type CommunityPostType = {
  _id:string,
  id:number,
  name:string,
  title:string,
  text:string,
  date:string,
}

function CommunityMy(): JSX.Element {
// navigate
const navigate = useNavigate();

// 공통 state
let [communityPostData, setCommunityPostData] = useState<CommunityPostType[] | null>(null);
let [userCheck, setuserCheck] = useState<null | number>(null);

// 커뮤티니 게시글 리스트 조회
useEffect(()=>{
  axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/GETcommunityMy', { withCredentials: true })
  .then((result)=>{
    if(result.data.authentication === 'failed') navigate('/login');

    if(result.data.communityArr === null){
      setuserCheck(result.data.userID);
      setCommunityPostData(result.data.communityArr);
    }
    if(result.data.communityArr !== null){
      setuserCheck(result.data.userID);
      setCommunityPostData(result.data.communityArr);
      setRenderData(result.data.communityArr.slice(0, 7));
    }
  })
  .catch((error)=>{console.log(error)});
},[]);



// 페이지게이션 번호 업데이트
// 커뮤티니 게시글 리스트 업데이트
const contentUl = useRef<HTMLUListElement>(null);
const [renderData, setRenderData] = useState<CommunityPostType[]>([]);
const [pageNavigator, setPageNavigator] = useState(1);
const [maxPage, setMaxPage] = useState(0);
if(communityPostData && maxPage === 0) setMaxPage(Math.ceil((communityPostData.length/7)));
function setPageNumber(pageNumber:number, checkNumber:number){
  // 페이지게이션 번호 업데이트
  let navPageNumber = pageNumber;
  
  console.log(navPageNumber);
  if(pageNumber <= 1 || maxPage < 4) navPageNumber = 1
  if(maxPage-4 <= pageNumber && maxPage > 5) navPageNumber = maxPage-4
  setPageNavigator(navPageNumber);

  // 커뮤티니 게시글 리스트 업데이트
  let setNumber = (checkNumber - 1) * 7;
  
  if(setNumber <= 0) setNumber = 0;
  if(communityPostData && communityPostData.length <= setNumber) setNumber = (maxPage - 1) * 7;
  if(communityPostData) setRenderData(communityPostData.slice(setNumber, setNumber+7));

  // chatRoom scroll 최신 콘텐츠 위치로 이동
  if(contentUl.current) contentUl.current.scrollTop = 0;
}


return (
<div className='communityMy'>
  <Header />
  <main className='communityMy-inner'>
    <div className='communityMy-post-box'>
    <h2>나의 게시글</h2>
      {
        communityPostData === null
        ? <div className='notContent'>커뮤니티에 작성하신 게시글이 없습니다<br/><br/>게시글을 작성해 다른 사람과 재밌는 이야기를 공유해 보세요!!!</div>
        :
        <ul ref={contentUl}>
          {
            renderData.map((value, index)=>{
            return(
              <li key={index} onClick={()=>{navigate('/community/'+value.id)}}>
                <h3>{value.title}</h3>
                <div className='post-info'>
                  <span>No.{value.id}</span>
                  <span>작성자 : {value.name}</span>
                  <span>{value.date}</span>
                </div>
                <p>{value.text}</p>
              </li>
            )
            })
          }
        </ul>
      }
      {
        userCheck === null
        ? <button className='community-add-icon' onClick={()=>{navigate('/login')}}><TbPencil /></button>
        : <button className='community-add-icon' onClick={()=>{navigate('/community/write')}}><TbPencil /></button>
      }
      {
        communityPostData === null
        ? null
        :<div className='pagination'>
        <div className='pagination-flex'>
          {
            maxPage > 5
            ? <button className='prev-btn' onClick={()=>{setPageNumber(pageNavigator-5, pageNavigator-5)}}><TbChevronLeft /></button>
            : null
          }
          <button onClick={()=>{setPageNumber(pageNavigator-2, pageNavigator)}}>{pageNavigator}</button>
          <button onClick={()=>{setPageNumber(pageNavigator-1, pageNavigator+1)}}>{pageNavigator+1}</button>
          <button onClick={()=>{setPageNumber(pageNavigator, pageNavigator+2)}}>{pageNavigator+2}</button>
          <button onClick={()=>{setPageNumber(pageNavigator+1, pageNavigator+3)}}>{pageNavigator+3}</button>
          <button onClick={()=>{setPageNumber(pageNavigator+2, pageNavigator+4)}}>{pageNavigator+4}</button>
          {
            maxPage > 5
            ? <button className='next-btn' onClick={()=>{setPageNumber(pageNavigator+5, pageNavigator+5)}}><TbChevronRight /></button>
            : null
          }
        </div>
        </div>
      }
    </div>
  </main>
</div>
);
};



export default CommunityMy;