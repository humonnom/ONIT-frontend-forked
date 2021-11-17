import React, { useRef } from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import './Grid.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../redux/slice';
import {
  ACTION_CREATE,
  ACTION_NONE,
  TYPE_IMAGE,
} from '../../utils/constantValue';
import { setNewWigetInfo } from '../Widgets/newWidgetUtils';
import UseWindowSize from './UseWindowSize';

const ReactGridLayout = WidthProvider(RGL);

export default function GridLayout(props) {
  const dispatch = useDispatch();
  // rowHeight 공식 (width총길이 - margin * (col + 1)/ col)
  const rowHeight = (UseWindowSize().width - 170) / 16;

  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));

  const updateWidgets = (newWidget) => {
    // modal별로 slice에 키워드 만들어서 사용
    // 기존: imgInputWindow(input modal과 키워드 중복 사용)
    // 변경: popUpWindow
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        count: widgets.count + 1,
        list: [...widgets.list, newWidget],
      })
    );
    dispatch(
      createReplacementModalAction({
        ...modal,
        popUpWindow: false,
      })
    );
  };

  return (
    <ReactGridLayout
      layout={props.mylayout}
      className='layout'
      cols={16}
      rowHeight={rowHeight}
      margin={[10, 10]}
      compactType={null}
      preventCollision
      {...props}
    >
      {props.children}
    </ReactGridLayout>
  );
}
