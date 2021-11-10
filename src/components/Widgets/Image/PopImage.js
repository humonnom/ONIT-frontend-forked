import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementWidgetsAction } from '../../../redux/slice';
import {
  ACTION_CREATE,
  ACTION_NONE,
  TYPE_IMAGE,
} from '../../../utils/constantValue';

function PopImage(props) {
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));

  const [clickedType, setClickedType] = useState('default');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  // 위젯 업데이트
  function updateWidgets(newList) {
    console.log(newList);
  }

  function makeNewWidget() {
    const newWidget = {
      widget_action: ACTION_CREATE,
      widget_code: '',
      widget_type: TYPE_IMAGE,
      widget_data: { url: `${url}` },
      i: `${widgets.count + 1}`,
      x: 1,
      y: 1,
      w: 1,
      h: 1,
    };

    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        count: widgets.count + 1,
        list: [...widgets.list, newWidget],
      })
    );
  }

  const handleSubmit = (event) => {
    // TODO: url valid 한지 체크해야함
    makeNewWidget();
  };

  const handleChange = ({ target: { value } }) => {
    console.log(value);
    setUrl(value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  function generateFirstDom() {
    return (
      <>
        <button
          type='button'
          style={imgStyle}
          onClick={() => {
            setClickedType('justImage');
          }}
        >
          그냥 이미지
        </button>
        <button
          type='button'
          style={aImgStyle}
          onClick={() => {
            setClickedType('aTagImage');
          }}
        >
          클릭 가능 이미지
        </button>
      </>
    );
  }

  function generateSecondDom() {
    if (clickedType === 'justImage') {
      return (
        <>
          <input
            type='url'
            name='url'
            value={url}
            placeholder='그림의 url을 입력하세요'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type='button'
            onClick={() => {
              handleSubmit();
              props.endPop();
              setClickedType('default');
            }}
          >
            확인
          </button>
        </>
      );
    } else {
      return (
        <>
          그림 url, 클릭 Url
          <button
            type='button'
            onClick={() => {
              props.endPop();
              setClickedType('default');
            }}
          >
            확인
          </button>
        </>
      );
    }
  }

  return (
    <>
      {clickedType === 'default' ? (
        <>{generateFirstDom()}</>
      ) : (
        <>{generateSecondDom()}</>
      )}
    </>
  );
}
const aImgStyle = {
  display: 'inlineBlock',
  textAlign: 'center',
  margin: '12.5% 10%',
  padding: '0',
  width: '30%',
  height: '50%',
};

const imgStyle = {
  display: 'inlineBlock',
  textAlign: 'center',
  margin: '12.5% 10%',
  padding: '0',
  width: '30%',
  height: '50%',
};

export default PopImage;
