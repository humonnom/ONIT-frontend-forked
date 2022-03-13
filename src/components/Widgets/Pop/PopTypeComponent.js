import React from 'react';
import { useSelector } from 'react-redux';
import PopImage from '../Image/PopImage';
import PopVideo from '../Video/PopVideo';
import PopNonType from '../NonType/PopNonType';

const PopTypeComponent = (props) => {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  const { endPop } = props;

  function getModalBody(type) {
    if (type === 'image') {
      return <PopImage endPop={endPop} label='이미지 추가' />;
    } else if (type === 'video') {
      return <PopVideo endPop={endPop} label='비디오 추가' />;
    } else {
      return <PopNonType endPop={endPop} label='안내' />;
    }
  }

  const modalBody = getModalBody(modal.popUpWindowType);

  return <>{modalBody}</>;
};

export default PopTypeComponent;
