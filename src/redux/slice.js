import { configureStore, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'info',
  initialState: {
    modal: {
      imgInputWindow: false,
    },
    widget: {
      i: 0,
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      type: '',
      source: '',
    },
    widgets: {
      count: 0,
      list: [{}],
    },
  },
  reducers: {
    replacementWidget(state, action) {
      state.widget = action.payload;
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
  replacementWidget: createReplacementWidgetAction,
  replacementWidgets: createReplacementWidgetsAction,
  replacementModal: createReplacementModalAction,
} = slice.actions;

export const store = configureStore({
  reducer: {
    info: infoReducer,
  },
});
