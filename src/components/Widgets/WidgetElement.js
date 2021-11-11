import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../redux/slice';
import {
  ACTION_CREATE,
  ACTION_DELETE,
  TYPE_IMAGE,
  TYPE_VIDEO,
} from '../../utils/constantValue';
import ImageBox from './Image/ImageBox';
import VideoBox from './Video/VideoBox';

export function WidgetElement({ element, mode }) {
  const [hover, setHover] = useState(false);
  const layout = element;
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const dispatch = useDispatch();

  // dispatch
  const openEditWindow = (id) => {
    dispatch(
      createReplacementModalAction({
        ...modal,
        imgInputWindow: true,
        imgChangeTargetId: id,
      })
    );
  };
  const closeEditWindow = () => {
    dispatch(
      createReplacementModalAction({
        ...modal,
        imgInputWindow: false,
      })
    );
  };
  const updateWidgets = (newWidgetList) => {
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        list: newWidgetList,
      })
    );
  };
  function getNewWidgetList(targetItemIndex, newAction) {
    const newList = JSON.parse(JSON.stringify(widgets.list));
    // console.log(targetItemCode);
    const found = newList.find((widget) => widget.i === targetItemIndex);
    if (found.widget_action === ACTION_CREATE && newAction === ACTION_DELETE) {
      found.widget_action = newAction;
    } else if (found.widget_action !== ACTION_CREATE) {
      found.widget_action = newAction;
    }
    // console.log(found);
    // TODO: 만들자마자 삭제한 위젯도 widget_action 'D'로 보내면 되는지 확인
    return newList;
  }

  function classifyBox(curInfo) {
    if (curInfo.widget_type === TYPE_IMAGE) {
      return <ImageBox element={element} />;
    } else if (curInfo.widget_type === TYPE_VIDEO) {
      return <VideoBox element={element} />;
    } else {
      return (
        <div
          key={curInfo.i}
          style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
        >
          <center className='text'>{curInfo.i}</center>
          <center>
            {curInfo.x}, {curInfo.y}
          </center>
        </div>
      );
    }
  }

  return (
    <div
      key={parseInt(layout.i, 10)}
      style={{
        backgroundColor: 'lightgray',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {mode === 'edit' && hover && (
        <>
          <button
            type='button'
            style={{ position: 'absolute', top: '5px', left: '3px' }}
            onClick={() => {
              console.log(layout.i);
              openEditWindow(layout.i);
              const newWidgetList = getNewWidgetList(layout.i, 'E');
              console.log(newWidgetList);
              updateWidgets(newWidgetList);
            }}
          >
            ⚙︎
          </button>
          <button
            type='button'
            style={{ position: 'absolute', top: '5px', right: '3px' }}
            onClick={() => {
              console.log(layout.i);
              const newWidgetList = getNewWidgetList(layout.i, 'D');
              console.log(newWidgetList);
              updateWidgets(newWidgetList);
            }}
          >
            x
          </button>
        </>
      )}
      {classifyBox(layout)}
    </div>
  );
}
