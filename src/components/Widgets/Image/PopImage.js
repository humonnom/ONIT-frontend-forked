/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';
import { createReplacementWidgetsAction } from '../../../redux/slice';
import { ACTION_CREATE, TYPE_IMAGE } from '../../../utils/constantValue';

function PopImage(props) {
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));

  const [thumbnail, setThumbnail] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  function makeNewWidget() {
    const newWidget = {
      widget_action: ACTION_CREATE,
      widget_code: '',
      widget_type: TYPE_IMAGE,
      widget_data: {
        thumbnail: `${thumbnail}`,
        url: `${url}`,
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

  const handleUrlChange = ({ target: { value } }) => {
    console.log(value);
    setUrl(value);
  };

  const handleThumbChange = ({ target: { value } }) => {
    console.log(value);
    setThumbnail(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <input
        type='thumbnail'
        name='thumbnail'
        value={thumbnail}
        css={[urlInputStyle, twoUrl1InputMargin]}
        placeholder='그림의 url을 입력하세요'
        onChange={handleThumbChange}
        onKeyDown={handleKeyDown}
      />
      <input
        type='url'
        name='url'
        value={url}
        css={[urlInputStyle, twoUrl2InputMargin]}
        placeholder='클릭시 이동할 링크의 url을 입력하세요'
        onChange={handleUrlChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type='button'
        css={[commonButtonStyle, cancelButtonStyle]}
        onClick={() => {
          props.endPop();
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
        }}
      >
        확인
      </button>
    </>
  );
}

const urlInputStyle = css`
  display: block;
  text-align: center;
  width: 90%;
  height: 40px;
  border: none;
  border-bottom: 3px solid black;
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
