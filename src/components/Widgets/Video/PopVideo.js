/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';
import { createReplacementWidgetsAction } from '../../../redux/slice';
import {
  ACTION_CREATE,
  ACTION_NONE,
  TYPE_VIDEO,
} from '../../../utils/constantValue';

function PopVideo(props) {
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));

  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  function makeNewWidget() {
    const newWidget = {
      widget_action: ACTION_CREATE,
      widget_code: '',
      widget_type: TYPE_VIDEO,
      widget_data: { thumbnail: `${url}` },
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

  return (
    <>
      <input
        type='url'
        name='url'
        value={url}
        css={[urlInputStyle]}
        placeholder='링크를 입력해주세요'
        onChange={handleChange}
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
  width: 440px;
  height: 24px;
  border: solid 1px #707070;
  margin: 28px auto 32px auto;
  border-radius: 8px;
  background-color: #fff;
  padding: 12px 20px;
`;

const commonButtonStyle = css`
  display: inline-block;
  height: 48px;
  width: 160px;
  border-radius: 24px;
  border: none;
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.9;
  letter-spacing: normal;
  color: #bbb;
  background-color: #fff;
  padding: 0px;
  &:hover {
    background-color: #ef6408;
    color: #fff;
  }
`;
const confirmButtonStyle = css`
  margin: 0 0 0 10px;
`;

const cancelButtonStyle = css`
  margin: 0 0 0 190px;
`;

export default PopVideo;
