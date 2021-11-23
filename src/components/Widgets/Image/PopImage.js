/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';
import { createReplacementWidgetsAction } from '../../../redux/slice';
import { ACTION_CREATE, TYPE_IMAGE } from '../../../utils/constantValue';
import { popButtonsWrapper } from '../../../styles/popWindowStyle';

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
      w: 2,
      h: 2,
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
    props.endPop();
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
        css={[urlInputStyle]}
        placeholder='링크를 입력해주세요'
        onChange={handleThumbChange}
        onKeyDown={handleKeyDown}
      />
      <div css={[popButtonsWrapper]}>
        <button
          type='button'
          onClick={() => {
            props.endPop();
          }}
        >
          취소
        </button>
        <button
          type='button'
          onClick={() => {
            handleSubmit();
            props.endPop();
          }}
        >
          확인
        </button>
      </div>
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

// const popButtonsWrapper = css`
//   display: flex;
//   flex-direction: row;
//   justify-content: end;
//   margin: 0 30px;
//   button {
//     display: block;
//     height: 35px;
//     width: 130px;
//     border-radius: 24px;
//     border: none;
//     background-color: #fff;
//     color: #bbb;
//     font-size: 15px;
//     margin: 0 10px;
//     padding: 0px;
//     &:hover {
//       background-color: #ef6408;
//       color: #fff;
//     }
//     transition: 0.2s;
//   }
// `;

export default PopImage;
