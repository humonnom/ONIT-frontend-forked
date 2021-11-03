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

const ReactGridLayout = WidthProvider(RGL);

export default function GridLayout(props) {
  const gridLayoutDiv = useRef(16);
  const dispatch = useDispatch();

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

  function onDrop(layout, layoutItem, _event) {
    console.log('on drop');
    // TODO: 사이즈 구분해서 만들어야 함.
    // 현재 s, m, l로 구분해두었고 스트링으로 매개변수로 넣게 되어있는데 다른 방법으로 고쳐도 됨
    // s가 디폴트로 되어있음.
    const newWidget = setNewWigetInfo(layoutItem, 's', widgets.count);
    updateWidgets(newWidget);
  }

  return (
    <ReactGridLayout
      layout={props.mylayout}
      className='layout'
      cols={16}
      rowHeight={80}
      margin={[11, 10]}
      compactType={null}
      preventCollision
      onDrop={onDrop}
      isDroppable
      {...props}
    >
      {props.children}
    </ReactGridLayout>
  );
}
