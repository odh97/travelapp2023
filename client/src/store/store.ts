import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

// axios
import axios from 'axios';

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
  resultData : DBHistoryType;
  index : number;
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
        console.log(data);
        for(let item of data){
          state.unshift(item);
        }
      }
    },
    chatUpdate(state, action:PayloadAction<chatUpdate>){
      const { resultData, index } = action.payload;
      const updateData = {...resultData}
      console.log(updateData);

      state[index] = updateData;
    },
    changeTitle(state, action:PayloadAction<changeTitle>){
      let {title, data, id} = action.payload;
      let updateData: DBHistoryType | undefined = undefined;
      let index: number | undefined = undefined;

      for(let item in data){
        if(data[item].id === id){
          index = Number(item);
          updateData = {
            ...data[item],
            title : title,
          }
        }
      }
      
      if(updateData !== undefined && index !== undefined){
        // 비회원
        if(updateData.id === null) state[0] = updateData;

        // 회원
        if(updateData.id !== null){
          let newData = [...data];
          newData[index] = updateData;

          state.length = 0;
          for(let item of newData){
            state.push(item);
          }

          // ajax 요청
          axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/chatTitleUpdate',updateData, { withCredentials: true })
          .then((result)=>{console.log(result.data);})
          .catch((error)=>{console.log(error)});
        }
      }
    },
    deleteData(state, action:PayloadAction<number>){
      const index = action.payload;

      state.splice(index, 1);
    },

  }
})
export let { setState, newState, chatUpdate, changeTitle, deleteData } = userChatArr.actions;

const chatNumber = createSlice({
  name : 'chatNumber',
  initialState : {target:0},
  reducers : {
    updateChatNumber(state, action:PayloadAction<number>){
      // action.type : state 변경 함수 이름
      // action.payload : 파라미터 값 가져오기
      state.target = action.payload;
    },
  }
})
export let { updateChatNumber } = chatNumber.actions;

export default configureStore({
  reducer: {
    userChatArr: userChatArr.reducer,
    chatNumber: chatNumber.reducer,
  },
});