/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';

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
      widget_data: {
        thumbnail: `${url}`,
        // url: 'https://humonnom.tistory.com/',
      },
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
            css={[urlInputStyle, oneUrlInputMargin]}
            placeholder='그림의 url을 입력하세요'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type='button'
            css={[commonButtonStyle, cancelButtonStyle]}
            onClick={() => {
              props.endPop();
              setClickedType('default');
            }}
          >
            취소
          </button>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonStyle]}
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
          <input
            type='url'
            name='url'
            value={url}
            css={[urlInputStyle, twoUrl1InputMargin]}
            placeholder='그림의 url을 입력하세요'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type='url'
            name='url'
            value={url}
            css={[urlInputStyle, twoUrl2InputMargin]}
            placeholder='클릭시 이동할 링크의 url을 입력하세요'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type='button'
            css={[commonButtonStyle, cancelButtonStyle]}
            onClick={() => {
              props.endPop();
              setClickedType('default');
            }}
          >
            취소
          </button>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonStyle]}
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

const urlInputStyle = css`
  display: block;
  text-align: center;
  width: 90%;
  height: 40px;
  border: none;
  border-bottom: 3px solid black;
`;

const oneUrlInputMargin = css`
  margin: 95px 5% 40px 5%;
`;

const twoUrl1InputMargin = css`
  margin: 60px 5% 10px 5%;
`;

const twoUrl2InputMargin = css`
  margin: 5px 5% 40px 5%;
`;

const commonButtonStyle = css`
  display: inline-block;
  height: 30px;
  width: 100px;
  border: none;
  background-color: white;
  padding: 0px;
  &:hover {
    background-color: #189ab4;
  }
`;

const confirmButtonStyle = css`
  margin: 0 150px 0 0;
`;

const cancelButtonStyle = css`
  margin: 0 0 0 150px;
`;

export default PopImage;
