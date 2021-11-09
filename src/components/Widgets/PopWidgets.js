import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementModalAction } from '../../redux/slice';
import { REAL_HEADER_HEIGHT } from '../../utils/style';
import EditImage from './Image/EditImage';
import NewImage from './Image/NewImage';

function PopWidgets(props) {
  const dispatch = useDispatch();

  const [isDrag, setDrag] = useState('off');
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  // 드래스 시 setDrag on으로 바꿔 레이어 없앰
  const getOnDragStart = () => {
    setDrag('on');
    console.log('드래그중');
  };

  // 드래스 끝날 시 팝업 삭제와 setDrag 원상복구
  const getOnDragEnd = () => {
    dispatch(
      createReplacementModalAction({
        ...modal,
        popUpWindow: false,
      })
    );
    setDrag('off');
    // 얘가 안나와요 왜일까요?
    console.log('드래그 끝');
  };

  return (
    <div>
      {isDrag === 'off' ? (
        <div style={backGroundPopStyle}>
          <div style={widgetBoxPopStyle} />
        </div>
      ) : (
        <></>
      )}
      <NewImage getOnDragStart={getOnDragStart} getOnDragEnd={getOnDragEnd} />
    </div>
  );
}

const backGroundPopStyle = {
  position: 'fixed',
  zIndex: '10',
  top: `${REAL_HEADER_HEIGHT}`,
  backgroundColor: 'rgba( 50, 50, 55, 0.5 )',
  width: '100vw',
  minHeight: `calc(100vh - ${REAL_HEADER_HEIGHT})`,
};

// 이거 Css
const widgetBoxPopStyle = {
  position: 'fixed',
  zIndex: '11',
  top: `50%`,
  left: `50%`,
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  borderRadius: '10px',
  width: '500px',
  height: `250px`,
};

export default PopWidgets;
