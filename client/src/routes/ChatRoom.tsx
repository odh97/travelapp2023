import React, {useRef} from 'react';
import '../styles/components/ChatRoom.scss'

// components import
import Header from '../_layout/Header';

// icon 
import { CiChat1,CiChat2,CiPaperplane,CiUser,CiFolderOn,CiLocationArrow1 } from "react-icons/ci";
import { TbBrandTelegram, TbPlus } from "react-icons/tb";
// axios
import axios from 'axios';
/* 챗봇 대화 내용

1번) 새로운 대화창
신규 대화창 btn을 클릭시 이벤트 발생
리스트에 대화창 하나가 추가되고 추가된 대화창 보여주기


2번) 기존 대화창
리스트 클릭시 DB에 있는 data 가져오기
DB-data를 map으로 뿌려주고




*/
let user_val = `유저가 질문한 데이터 입니다.`;
let test_respones_data = `A: 성공했을때 리턴값입니다.`;
let test_DB_data = [
`Q:일본 2박3일 여행 일정 만들어줘`,
`A:일본 2박3일 여행 일정을 만들어드리겠습니다! 하지만 일본은 매우 다양한 관광지와 맛집이 많아서, 여행 목적과 선호하는 스타일에 따라 다양한 일정이 가능합니다. 따라서, 가능한 자세한 여행 계획을 알려주시면 보다 구체적인 일정을 제시할 수 있습니다. 아래는 대략적인 일정 예시입니다.

일정:
Day 1:

도쿄 도착
아사쿠사 신사 방문
우에노 동물원 공원에서 동물들 관람
스시점에서 일식 즐기기
Day 2:

후지산 일일 관광 투어
다케시타 고텐바 전망대에서 후지산 전망 감상
오도아라케 시장에서 재미있는 쇼핑 즐기기
신주쿠에서 레스토랑에서 저녁 식사
Day 3:

아침에 아마노하시드메 도보관광
하라주쿠 지역에서 쇼핑 및 레스토랑 즐기기
도쿄에서 국제센터에서 쇼핑 즐기기
도쿄 출발
이 일정은 일본의 대표적인 도시인 도쿄와 후지산 등 일본에서 유명한 관광지를 방문하는 것을 기반으로 한 일정입니다. 여행 목적, 예산, 선호하는 음식 등을 고려하여 일정을 조정할 수 있습니다.`,
`Q:오사카가 가고 싶은데 오사카 여행 일정으로 만들어 줄래?`,
`A:물론입니다! 오사카 여행 일정을 제안해드리겠습니다.

일정:
Day 1:

오사카 도착 후 호텔 체크인
오사카성 탐방
도톤보리 지역에서 유명한 음식점에서 오사카의 로컬 음식 체험
신세카이에서 타워의 전망을 즐기고 지역의 가게들을 탐험
Day 2:

유니버설 스튜디오 재팬(USJ) 방문
해리 포터의 마법 세계와 슈퍼 히어로들을 만나는 등 다양한 어트랙션 체험
교토로 이동
키요미즈데라 사원 방문
기온 거리에서 전통 가게들을 탐험하며 저녁 식사
Day 3:

오사카 수상버스 투어로 오사카의 유명한 명소들을 감상
신오사카 스카이빌딩에서 오사카 도시의 아름다운 전망 감상
오사카에서의 마지막 저녁 식사를 즐긴 후 공항으로 이동
이 일정은 오사카의 주요 명소인 오사카성, 도톤보리, 신세카이를 방문하며, 유니버설 스튜디오 재팬(USJ)을 경험하고 교토의 키요미즈데라 사원을 감상하는 것을 중점으로 한 일정입니다. 자유로운 시간을 가지고 현지의 다양한 음식과 문화를 즐기는 것도 추천드립니다. 여행 일정은 개인의 선호와 시기에 따라 변경될 수 있으니 참고 바랍니다. 즐거운 오사카 여행이 되길 바랍니다!`,
];

let user = "Q:" + user_val;
let chatBot = test_respones_data;

test_DB_data.push(user);
test_DB_data.push(chatBot);


// axios.get('https://codingapple1.github.io/shop/data'+dataNm+'.json')
// 빌드했을 경우 axios.get('/주소명')
axios.get('http://localhost:8080/testData')
.then((result)=>{
  console.log(result.data);
})
.catch((error)=>{
  console.log(error);
});




function ChatRoom(): JSX.Element{

const textRef = useRef<HTMLTextAreaElement>(null);
const divRef = useRef<HTMLDivElement>(null);

let txtInput = ():void =>{
  textRef.current!.style.height = 'auto';
  divRef.current!.style.height = 'auto';
  textRef.current!.style.height = textRef.current!.scrollHeight + "px";
  divRef.current!.style.height = (textRef.current!.scrollHeight+30) + "px";
}


  return (
  <div className='chat'>
    <Header />
    <main>
      <ChatList />
      <div className='chat-room'>
        <div className='txt-box'>
          <ul>
          {test_DB_data.map((value, index)=>{
            if(value.charAt(0) === "Q"){
              return(
              <li className='user' key={index}>
                <div className='icon-box'><CiUser/></div>
                <pre>{value.replace("Q:","")}</pre>
              </li>
              )
            }
            if(value.charAt(0) === "A"){
              return(
                <li className='chat-bot' key={index}>
                  <div className='icon-box'><TbBrandTelegram /></div>
                  <pre>{value.replace("A:","")}</pre>
                </li>
                )
            }
          })}

          </ul>
          <div className='empty-box'></div>
        </div>
        <div className='chat-input-box'>
          <div className='chat-input-box-inner' ref={divRef}>
            <textarea cols={85} rows={1}
              ref={textRef}
              onChange={()=>{txtInput()}}
              onKeyDown={(e)=>{
                if(!e.shiftKey && e.key === "Enter"){console.log("Enter 누르면 Data 전송 기능 구현");}
                if(e.shiftKey && e.key === "Enter"){console.log("줄바꿈");}
                }}>
            </textarea>
            <button><CiLocationArrow1/></button>
          </div>
        </div>
      </div>
    </main>
  </div>
  )
}

function ChatList(): JSX.Element{
  return (
  <div className='chat-list'>
    <ul>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
      <li><button><CiChat1/><span>새로운 채팅</span></button></li>
    </ul>
    <div className='chatroom-create-btn'><button><TbPlus/><span>New chat</span></button></div>
  </div>
  )
}

// export {DscrpTab, QandATab, ReviewTab}; //여러개 내보낼때

export default ChatRoom;