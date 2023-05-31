import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// type 지정
type DBHistoryType = {
  id: null | string;
  title: string;
  chatting_arr: {
    ko_chat_arr: string[];
    en_chat_arr: string[];
  };
  Date: Date;
};

const userChatArr = createSlice({
  name : 'userChatArr',
  initialState : [] as Array<object>,
  reducers : {
    setState(state, action:PayloadAction<object>){
      // action.type : state 변경 함수 이름
      // action.payload : 파라미터 값 가져오기
      console.log(state)
      if (typeof action.payload === "object") {
        state.push(action.payload);
        console.log(state)
      }
    },

    changeTitle(state, action){

    },

  }
})
export let { setState, changeTitle } = userChatArr.actions;

export default configureStore({
  reducer: {
    userChatArr: userChatArr.reducer,
  },
});