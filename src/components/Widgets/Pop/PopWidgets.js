import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementModalAction } from '../../../redux/slice';
import { REAL_HEADER_HEIGHT } from '../../../utils/style';
import PopTypeComponent from './PopTypeComponent';

function PopWidgets(props) {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));
  return (
    <div style={backGroundPopStyle}>
      <div style={widgetBoxPopStyle}>
        <PopTypeComponent />
      </div>
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
