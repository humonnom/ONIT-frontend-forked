import { configureStore, createSlice } from '@reduxjs/toolkit';
import { DELETED_OFF } from '../utils/constantValue';

const slice = createSlice({
  name: 'info',
  initialState: {
    modal: {
      imgInputWindow: false,
    },
    widgets: {
      count: 0,
      list: [
        {
          i: '',
          x: 0,
          y: 0,
          w: 2,
          h: 2,
          widget_action: '',
          widget_type: 0,
          widget_data: {},
          widget_code: '',
          widget_deleted: DELETED_OFF,
        },
      ],
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
  replacementNewWidgets: createReplacementTmpWidgetsAction,
  replacementModal: createReplacementModalAction,
} = slice.actions;

export const store = configureStore({
  reducer: {
    info: infoReducer,
  },
});

// // 이 특별한 주석의 이름은 JSDoc 임.

// /**
//  * @typedef {Object} RootState
//  * @property {any} widgets
//  * @property {any} new_widgets
//  * @property {any} widget
//  * @property {any} modal
//  */

// /** @type {import('react-redux').TypedUseSelectorHook<ReturnType<(typeof store)["getState"]>>} */
// export const useAppSelector = useSelector;
