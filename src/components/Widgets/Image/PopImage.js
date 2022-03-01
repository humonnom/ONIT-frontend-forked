/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { InitButtonStyle } from '../../../styles/GlobalStyles';
import PopButtonsWrapper from '../PopButtonsWrapper';
import { useEditWidget, usePostImage } from '../../../hooks/widget';

function PopImage(props) {
  const [submitted, setSubmitted] = useState(false);
  const [isLocalUpload, setIsLocalUpload] = useState(true);
  const [thumbnail, setThumbnail] = useState('');
  const [localFiles, setLocalFiles] = useState(null);
  const { s3url, request } = usePostImage();

  const { edit } = useEditWidget();

  const handleSubmit = () => {
    if (isLocalUpload && localFiles) {
      request(localFiles); // post to server
    }
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && thumbnail) {
      edit(thumbnail);
      props.endPop();
    }
  }, [thumbnail, submitted]);

  const handleThumbChange = ({ target: { value } }) => {
    setThumbnail(value);
  };

  useEffect(() => {
    if (s3url) {
      setThumbnail(s3url);
    }
  }, [s3url]);

  const handleLocalUpload = ({ target: { files } }) => {
    setLocalFiles(files);
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
