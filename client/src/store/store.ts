import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

// type 지정
type DBHistoryType = {
  id: null | number;
  name : null | string;
  title: string;
  chatting_arr: {
    ko_chat_arr: string[];
    en_chat_arr: string[];
  };
  date: Date;
};

interface newState {
  id : null | number;
  data : DBHistoryType[];
}

interface chatUpdate {
  newChatting_arr : {
    ko_chat_arr: string[];
    en_chat_arr: string[];
  };
  storeState_copy : DBHistoryType;
}

interface changeTitle {
  title : string;
  id : null | number;
  data : DBHistoryType[];
}

const userChatArr = createSlice({
  name : 'userChatArr',
  initialState : [] as Array<DBHistoryType>,
  reducers : {
    setState(state, action:PayloadAction<DBHistoryType[]>){
      // action.type : state 변경 함수 이름
      // action.payload : 파라미터 값 가져오기
      let dataArr = action.payload;
      state.length = 0;
      for(let item of dataArr){
        state.push(item);
      }
    },
    newState(state, action:PayloadAction<newState>){
      // action.type : state 변경 함수 이름
      // action.payload : 파라미터 값 가져오기update
      const { id, data } = action.payload;
      if(id === null){
        state.length = 0;
        for(let item of data){
          state.push(item);
        }
      }
      if(id !== null){
        for(let item of data){
          state.push(item);
        }
      }
    },
    chatUpdate(state, action:PayloadAction<chatUpdate>){
      const { newChatting_arr, storeState_copy } = action.payload;

      // 게스트 계정
      if(storeState_copy.id === null){
        const updateData = {
          ...storeState_copy,
          chatting_arr: newChatting_arr,
        };
  
        state[0] = updateData;
      }

      // 회원 계정
      // {미작성}
      if(storeState_copy.id !== null){

      }
    },

    changeTitle(state, action:PayloadAction<changeTitle>){
      let newTitle = action.payload.title;
      let data = action.payload.data;
      let id = action.payload.id;

      for(let item in data){
        if(data[item].id === id){
          // data[item].title = title;
          const updateData={
            ...data[item],
            title : newTitle,
          }

          state[item] = updateData;
        }
      }

      // 회원 계정
      // {미작성}
    },

  }
})
export let { setState, newState, chatUpdate, changeTitle } = userChatArr.actions;

export default configureStore({
  reducer: {
    userChatArr: userChatArr.reducer,
  },
});