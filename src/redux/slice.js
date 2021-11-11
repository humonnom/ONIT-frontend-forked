import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ACTION_NONE } from '../utils/constantValue';

const slice = createSlice({
  name: 'info',
  initialState: {
    user: {
      name: '박주은',
      id: -1,
    },
    modal: {
      imgInputWindow: false,
      imgChangeTargetId: -1,
      popUpWindow: false,
      popUpWindowType: 'default',
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
        },
      ],
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

// // 이 특별한 주석의 이름은 JSDoc 임.

// /**
//  * @typedef {Object} RootState
//  * @property {any} widgets
//  * @property {any} modal
//  * @property {any} user
//  */

// /** @type {import('react-redux').TypedUseSelectorHook<ReturnType<(typeof store)["getState"]>>} */
// export const useAppSelector = useSelector;
