import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import './Grid.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../redux/slice';

const ReactGridLayout = WidthProvider(RGL);

export default function GridLayout(props) {
  const dispatch = useDispatch();
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));

  const makeNewWidgetInfo = (newWidget) => {
    newWidget.i = widgets.count.toString();
  };

  const updateWidgets = (newWidget) => {
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
        imgInputWindow: false,
      })
    );
  };

  function onDrop(layout, layoutItem, _event) {
    makeNewWidgetInfo(layoutItem);
    updateWidgets(layoutItem);
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
