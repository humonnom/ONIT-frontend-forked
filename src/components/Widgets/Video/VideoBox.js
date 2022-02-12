/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { YoutubeVideo } from '../..';
import { WIDGET_COMMON_RADIUS } from '../../../styles/style';

export default function VideoBox({ element, mode }) {
  function getVideoCode(url) {
    const urlObj = new URL(url);
    const code = urlObj.searchParams.get('v');
    return code;
  }

  const videoCode = getVideoCode(element.widget_data.thumbnail) || '';
  const thumbnail = `https://img.youtube.com/vi/${videoCode}/mqdefault.jpg`;

  return (
    <>
      {mode === 'normal' && videoCode !== '' ? (
        videoCode !== '' && <YoutubeVideo embedId={videoCode} />
      ) : (
        <img src={thumbnail} alt='profile' css={imgStyle} />
      )}
    </>
  );
}

// style
const imgStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${WIDGET_COMMON_RADIUS};
  background: #000;
`;
