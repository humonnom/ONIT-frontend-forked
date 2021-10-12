import { configureStore, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'info',
  initialState: {
    widget: {
      i: 'i',
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      type: '',
      source: '',
    },
    widgets: [
      {
        i: 'i',
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        type: '',
        data: {},
      },
    ],
  },
  reducers: {
    replacementWidget(state, action) {
      state.widget = action.payload;
    },
    replacementWidgets(state, action) {
      state.widgets = action.payload;
    },
  },
});

export const infoReducer = slice.reducer;

export const {
  replacementWidget: createReplacementWidgetAction,
  replacementWidgets: createReplacementWidgetsAction,
} = slice.actions;

export const store = configureStore({
  reducer: {
    info: infoReducer,
  },
});
