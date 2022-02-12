import React from 'react';
import { useSelector } from 'react-redux';
import PopImage from '../Image/PopImage';
import PopVideo from '../Video/PopVideo';
import PopNonType from '../NonType/PopNonType';

const PopTypeComponent = (props) => {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  // 모든 위젯 컴포넌트에 props.endPop() 넣어줘야함
  function classifyBox(curInfo) {
    if (curInfo.popUpWindowType === 'image') {
      return <PopImage endPop={props.endPop} />;
    } else if (curInfo.popUpWindowType === 'video') {
      return <PopVideo endPop={props.endPop} />;
    } else {
      return <PopNonType endPop={props.endPop} />;
    }
  }

  return <>{classifyBox(modal)}</>;
};

export default PopTypeComponent;
