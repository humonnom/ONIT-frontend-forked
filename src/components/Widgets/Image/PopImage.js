/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';
import { createReplacementWidgetsAction } from '../../../redux/slice';
import {
  ACTION_EDIT,
  ACTION_NONE,
  TYPE_IMAGE,
} from '../../../utils/constantValue';
import PopButtonsWrapper from '../PopButtonsWrapper';

function PopImage(props) {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));

  const [thumbnail, setThumbnail] = useState('');
  const dispatch = useDispatch();

  function editWidget() {
    const allWidgets = JSON.parse(JSON.stringify(widgets.list));
    const targetId = modal.imgChangeTargetId;
    const targetItem = allWidgets.find((widget) => widget.i === targetId);
    targetItem.widget_type = TYPE_IMAGE;
    targetItem.widget_data = {
      thumbnail: `${thumbnail}`,
      url: '',
    };
    if (
      targetItem.widget_action === ACTION_NONE ||
      targetItem.widget_code !== ''
    ) {
      targetItem.widget_action = ACTION_EDIT;
    }
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        list: allWidgets,
      })
    );
  }

  const handleSubmit = () => {
    // TODO: url valid 한지 체크해야함
    editWidget();
    props.endPop();
  };

  const handleThumbChange = ({ target: { value } }) => {
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
      <PopButtonsWrapper>
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
      </PopButtonsWrapper>
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

export default PopImage;
