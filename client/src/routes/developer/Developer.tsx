import React from 'react';
import '../../styles/components/developer/Developer.scss'

// components import
import Header from '../../_layout/Header';
// images
import myimg from '../../images/myimg.jpg'
import Github from '../../images/icon/github-icon.png'
import Notion from '../../images/icon/Notion-logo.png'
import HtmlImg from '../../images/icon/html.png'
import CssImg from '../../images/icon/css.png'
import JavascriptImg from '../../images/icon/js-icon.png'
import TypescriptImg from '../../images/icon/typescript.png'
import ReactImg from '../../images/icon/react.png'
import NodeImg from '../../images/icon/node-icon.png'
import MongodbImg from '../../images/icon/mongodb.png'
// icons
import { TbMail, TbPhone } from "react-icons/tb";

// router
import { Link } from 'react-router-dom';


function Developer(): JSX.Element {

return (
<div className='developer'>
  <Header />
  <main className='developer-inner'>
      <div className='developer-info'>
        <h2>개발자 정보</h2>
        <img className='myImg' src={myimg} />
        <div className='blog-link'>
          <Link to={'https://github.com/odh97'} target="_blank">
            <img src={Github} />
            Github
          </Link>
          <Link to={'https://www.notion.so/TIL-Today-I-Learned-bca75cfcd1b14d868eb507d726ca8825?pvs=4'} target="_blank">
            <img src={Notion} />
            Notion
          </Link>
        </div>
        <div className='profile'>
          <div className='about'>
            <h3>about me</h3>
            <p>Oh Daehyeon / 오대현</p>
            <p>1997.07.04</p>
            <p>서울특별시 관악구</p>
          </div>
          <div className='contact'>
            <h3>contact</h3>
            <p><TbPhone/>010-9786-9700</p>
            <p><TbMail/>xzdheogus1@naver.com</p>
          </div>
          <div className='skill'>
            <h3>skill</h3>
            <div className='img-flex'>
              <div><img src={ReactImg} /></div>
              <div><img src={TypescriptImg} /></div>
              <div><img src={NodeImg} /></div>
              <div><img src={MongodbImg} /></div>
              <div><img src={HtmlImg} /></div>
              <div><img src={CssImg} /></div>
              <div><img src={JavascriptImg} /></div>
            </div>
          </div>
          <div className='experience'>
            <h3>experience</h3>
            <p><span>2022.07 - 2022.10</span>  에이블짐정보 개발팀</p>
            <p><span>2021.11 - 2022.05</span>  [스마트웹&콘텐츠개발]웹콘텐츠 UI/UX 디자인 & 프론트엔드(React.js)</p>
          </div>
        </div>
      </div>
  </main>
</div>
);
};



export default Developer;