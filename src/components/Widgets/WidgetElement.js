import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close_btn, setting_btn } from '../../asset';
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
      return <ImageBox element={element} mode={mode} />;
    } else if (curInfo.widget_type === TYPE_VIDEO) {
      return <VideoBox element={element} mode={mode} />;
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
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              opacity: '0.2',
              backgroundColor: '#000',
            }}
          />
          <button
            type='button'
            style={{
              appearance: 'none',
              position: 'absolute',
              top: '10px',
              right: '42px',
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'white',
            }}
            onClick={() => {
              console.log(layout.i);
              const newWidgetList = getNewWidgetList(layout.i, 'D');
              console.log(newWidgetList);
              updateWidgets(newWidgetList);
            }}
          >
            <img
              alt='img'
              style={{ width: '100%', height: '100%' }}
              src={close_btn}
            />
          </button>
          <button
            type='button'
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'white',
            }}
            onClick={() => {
              console.log(layout.i);
              openEditWindow(layout.i);
              const newWidgetList = getNewWidgetList(layout.i, 'E');
              console.log(newWidgetList);
              updateWidgets(newWidgetList);
            }}
          >
            <img
              alt='img'
              style={{ width: '100%', height: '100%' }}
              src={setting_btn}
            />
          </button>
        </>
      )}
      {classifyBox(layout)}
    </div>
  );
}
