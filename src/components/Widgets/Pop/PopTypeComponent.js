import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementModalAction } from '../../../redux/slice';
import PopImage from '../Image/PopImage';
import PopVideo from '../Video/PopVideo';

const PopTypeComponent = () => {
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  // 팝업 삭제 함수
  // 모든 컴포넌트에 넣어줘야함
  const endPop = () => {
    dispatch(
      createReplacementModalAction({
        ...modal,
        popUpWindow: false,
      })
    );
  };

  function classifyBox(curInfo) {
    console.log(curInfo);
    if (curInfo.popUpWindowType === 'image') {
      return <PopImage endPop={endPop} />;
    } else if (curInfo.popUpWindowType === 'video') {
      return <PopVideo endPop={endPop} />;
    } else {
      return <div>정해지지 않은 타입입니다</div>;
    }
  }

  return <>{classifyBox(modal)}</>;
};

export default PopTypeComponent;
