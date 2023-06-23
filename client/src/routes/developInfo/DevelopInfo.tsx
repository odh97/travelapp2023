import React, { useState,useEffect, useRef } from 'react';
import '../../styles/components/developInfo/DevelopInfo.scss'

// components import
import Header from '../../_layout/Header';
// images
import infoStructure from '../../images/info-structure.png';
// icon
import { TbChevronLeft,TbChevronRight } from "react-icons/tb";

// axios
import axios from 'axios';



function DevelopInfo(): JSX.Element {

let [versionInfoData, setVersionInfoData] = useState<{title:string,text:string}[]>();

useEffect(()=>{
  axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/GETversionInfo', { withCredentials: true })
  .then((result)=>{
    setVersionInfoData(result.data.result);
    setRenderData(result.data.result.slice(0, 5));
  })
  .catch((error)=>{console.log(error)});
},[]);



// 페이지게이션 번호 업데이트
// 커뮤티니 게시글 리스트 업데이트
const contentUl = useRef<HTMLUListElement>(null);
const [renderData, setRenderData] = useState<{title:string,text:string}[]>([]);
const [pageNavigator, setPageNavigator] = useState(1);
const [maxPage, setMaxPage] = useState(0);
if(versionInfoData && maxPage === 0) setMaxPage(Math.ceil((versionInfoData.length/5)));
function setPageNumber(pageNumber:number, checkNumber:number){
  // 페이지게이션 번호 업데이트
  let navPageNumber = pageNumber;
  
  console.log(navPageNumber);
  if(pageNumber <= 1 || maxPage < 4) navPageNumber = 1
  if(maxPage-4 <= pageNumber && maxPage > 5) navPageNumber = maxPage-4
  console.log(navPageNumber);
  setPageNavigator(navPageNumber);

  // 커뮤티니 게시글 리스트 업데이트
  let setNumber = (checkNumber - 1) * 5;
  
  if(setNumber <= 0) setNumber = 0;
  if(versionInfoData && versionInfoData.length <= setNumber) setNumber = (maxPage - 1) * 5;
  if(versionInfoData) setRenderData(versionInfoData.slice(setNumber, setNumber+5));

  // chatRoom scroll 최신 콘텐츠 위치로 이동
  if(contentUl.current) contentUl.current.scrollTop = 0;
}


return (
<div className='developInfo'>
  <Header />
  <main className='developInfo-inner'>
      <div className='info-structure'>
        <h2>정보 구조도</h2>
        <img src={infoStructure} />
      </div>
      <div className='develop-version'>
        <h2>깃허브 개발 정보</h2>
        <ul ref={contentUl}>
          {
            renderData === undefined
            ? undefined
            :
            renderData.map((value,index)=>{
              return(
                <li> 
                  <h3>{value.title}</h3>
                  <div>
                    <pre>{value.text}</pre>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className='pagination'>
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
      </div>
  </main>
</div>
);
};



export default DevelopInfo;