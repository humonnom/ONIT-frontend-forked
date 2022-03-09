/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';
import { createReplacementWidgetsAction } from '../../../redux/slice';
import {
  ACTION_EDIT,
  ACTION_NONE,
  TYPE_VIDEO,
} from '../../../utils/constantValue';

import {
  BasicInputStyle,
  commonBtn,
  FlexColCenter,
  getAbsoluteBtn,
  InitButtonStyle,
  OrangeColorButton,
  RoundButtonSmall,
  SHADOW_STYLE,
} from '../../../styles/GlobalStyles';
import { closeSet } from '../../../asset';

function PopVideo(props) {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));

  const { label, endPop } = props;
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  function editWidget() {
    const allWidgets = JSON.parse(JSON.stringify(widgets.list));
    const targetId = modal.imgChangeTargetId;
    const targetItem = allWidgets.find((widget) => widget.i === targetId);
    targetItem.widget_type = TYPE_VIDEO;
    targetItem.widget_data = { thumbnail: `${url}` };
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
    if (url !== '') {
      editWidget();
    }
  };

  const handleChange = ({ target: { value } }) => {
    setUrl(value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
      endPop();
    }
  };

  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  return (
    <div css={[Container]}>
      <div css={PopupHeader}>
        <p css={[PopupLabel]}>{label}</p>
        <button
          type='button'
          css={[commonBtn, btn]}
          onClick={() => {
            endPop();
          }}
        >
          <div css={img}>
            <img alt='img' height='50px' src={closeSet} />
          </div>
        </button>
      </div>
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
        css={[InitButtonStyle, OrangeColorButton, RoundButtonSmall]}
        onClick={() => {
          handleSubmit();
          endPop();
        }}
      >
        업로드
      </button>
    </div>
  );
}
const Container = css`
  ${FlexColCenter}
  ${SHADOW_STYLE.pale}
  width: 100%;
  margin: 30px 0 20px 0;
`;

const urlInputStyle = css`
  ${BasicInputStyle}
  width: 440px;
  height: 24px;
  margin: 10px auto 32px auto;
  padding: 12px 20px;
`;

const PopupHeader = css`
  margin-bottom: 35px;
  height: 20px;
`;

const PopupLabel = css`
  font-family: NotoSansCJKKR;
  font-size: 1.3rem;
  font-weight: 800;
`;

export default PopVideo;
