import { configureStore, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'info',
  initialState: {
    user: {
      nickname: '',
      user_seq: -1,
      url: '',
      field: [],
    },
    modal: {
      imgInputWindow: false,
      imgChangeTargetId: -1,
      popUpWindow: false,
      popUpWindowType: 'default',
    },
    widgets: {
      count: 0,
      list: [],
    },
  },
  reducers: {
    replacementUser(state, action) {
      state.user = action.payload;
    },
    replacementWidgets(state, action) {
      state.widgets = action.payload;
    },
    replacementModal(state, action) {
      state.modal = action.payload;
    },
  },
});

export const infoReducer = slice.reducer;

export const {
  replacementWidgets: createReplacementWidgetsAction,
  replacementModal: createReplacementModalAction,
  replacementUser: createReplacementUserAction,
} = slice.actions;

export const store = configureStore({
  reducer: {
    info: infoReducer,
  },
});
