import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementModalAction } from '../../../redux/slice';
import PopTypeComponent from './PopTypeComponent';

function getLabel(modal) {
  if (modal.popUpWindowType === 'image') return '이미지';
  else if (modal.popUpWindowType === 'video') return '영상';
  else return '';
}

function PopWidgets() {
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  // 팝업 삭제 함수
  // 모든 하위 위젯 컴포넌트에 넣어줘야함
  const endPop = useCallback(() => {
    dispatch(
      createReplacementModalAction({
        ...modal,
        popUpWindow: false,
      })
    );
  }, [modal]);

  return (
    <div style={backGroundPopStyle}>
      <div style={widgetBoxPopStyle}>
        {getLabel(modal) !== '' ? (
          <div style={nameBoxStyle}>{getLabel(modal)} 업로드</div>
        ) : (
          <div style={nameBoxStyle}> 안내 </div>
        )}
        <PopTypeComponent endPop={endPop} />
      </div>
    </div>
  );
}

const backGroundPopStyle = {
  position: 'fixed',
  zIndex: '1000',
  top: '0px',
  backgroundColor: 'rgba( 0, 0, 0, 0.2 )',
  width: '100vw',
  minHeight: `calc(100vh)`,
};

// 이거 Css
const widgetBoxPopStyle = {
  position: 'fixed',
  zIndex: '11',
  top: `50%`,
  left: `50%`,
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  borderRadius: '20px',
  width: '560px',
  height: `280px`,
};

const nameBoxStyle = {
  fontFamily: 'NotoSansCJKKR',
  fontSize: '24px',
  fontWeight: 'bold',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: '36px',
  letterSpacing: 'normal',
  color: '#222',
  width: '100%',
  height: '36px',
  marginTop: '48px',
  textAlign: 'center',
};

export default PopWidgets;
