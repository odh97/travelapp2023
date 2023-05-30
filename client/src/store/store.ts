import { configureStore, createSlice } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  age: number;
}

const user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 20} as UserState,
  reducers : {
    changeName(state, action){
      // action.type : state 변경 함수 이름
      // action.payload : 파라미터 값 가져오기
      state.age += action.payload;
      state.name = 'park';
      console.log("chageName start");
      console.log(action.type);
    }
  }
})
export let { changeName } = user.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
  },
});