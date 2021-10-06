// 1. 일단 슬라이스를 만든다.
// restart ts server

import { configureStore, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'info',
  initialState: {
    widget: {
      i: 'test',
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      type: '',
      source: '',
    },
  },
  reducers: {
    replacementWidget(state, action) {
      state.widget = action.payload;
    },
  },
});

// 실제로 사용할 리듀서 (Reducer)
export const infoReducer = slice.reducer;

// 사용할 액션을 만들어주는 함수 (ActionCreator)
// 액션의 이름이 리듀서 만들 때 이름이랑 같아서 헷갈리니까,
// create...Action 으로 개명해서 export 시킨다.
export const { replacementWidget: createReplacementWidgetAction } =
  slice.actions;

export const store = configureStore({
  reducer: {
    info: infoReducer,
  },
});

// 😇rename symbol 쓰기^^😇
