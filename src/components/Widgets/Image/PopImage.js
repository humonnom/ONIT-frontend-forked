/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { InitButtonStyle } from '../../../styles/GlobalStyles';
import { createReplacementWidgetsAction } from '../../../redux/slice';
import {
  ACTION_EDIT,
  ACTION_NONE,
  TYPE_IMAGE,
} from '../../../utils/constantValue';
import PopButtonsWrapper from '../PopButtonsWrapper';
import { usePostImage } from '../../../hooks/widget';

function PopImage(props) {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));

  const [isLocalUpload, setIsLocalUpload] = useState(true);
  const [thumbnail, setThumbnail] = useState('');
  const { s3url, request } = usePostImage();
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
    editWidget();
    props.endPop();
  };

  const handleThumbChange = ({ target: { value } }) => {
    setThumbnail(value);
  };

  useEffect(() => {
    if (s3url) {
      setThumbnail(s3url);
    }
  }, [s3url]);

  const handleLocalUpload = ({ target: { files } }) => {
    request(files); // post to server
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <button
        type='button'
        css={[InitButtonStyle, ToggleButtonStyle]}
        onClick={() => setIsLocalUpload(!isLocalUpload)}
      >
        {isLocalUpload ? '링크로 올리기' : '파일 올리기'}
      </button>
      {!isLocalUpload && (
        <input
          type='thumbnail'
          name='thumbnail'
          value={thumbnail}
          css={[urlInputStyle]}
          placeholder='링크를 입력해주세요'
          onChange={handleThumbChange}
          onKeyDown={handleKeyDown}
        />
      )}
      {isLocalUpload && (
        <input
          type='file'
          name='imgae_file'
          accept='image/*'
          css={urlInputStyle}
          onChange={handleLocalUpload}
        />
      )}
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

const ToggleButtonStyle = css`
  border: black solid 1px;
  padding: 5px;
  border-radius: 8px;
  display: block;
  margin: 0px auto 0px 40px;
`;

export default PopImage;
