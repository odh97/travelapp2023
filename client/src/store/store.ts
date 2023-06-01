import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';


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

// Redux 상태의 루트 타입 정의
interface storeStateType {
  userChatArr: DBHistoryType[];
}

const userChatArr = createSlice({
  name : 'userChatArr',
  initialState : [] as Array<DBHistoryType>,
  reducers : {
    setState(state, action:PayloadAction<DBHistoryType>){
      // action.type : state 변경 함수 이름
      // action.payload : 파라미터 값 가져오기
      state.push(action.payload);
    },
    chatUpdate(state, action:PayloadAction<string>){
      console.log(state);
      console.log(action.payload);
      // state[0].chatting_arr.ko_chat_arr.push(action.payload);
    },

    changeTitle(state, action){

    },

  }
})
export let { setState, chatUpdate, changeTitle } = userChatArr.actions;

export default configureStore({
  reducer: {
    userChatArr: userChatArr.reducer,
  },
});