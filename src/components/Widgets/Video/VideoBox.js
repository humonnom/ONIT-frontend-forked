/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { isURL } from 'validator';
import { YoutubeVideo } from '../..';
import { WIDGET_COMMON_RADIUS } from '../../../styles/style';

export default function VideoBox({ element, mode }) {
  function getVideoCode(url) {
    if (!isURL(url)) return '';
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      const pathname = urlObj.pathname.split('/');
      return pathname[1];
    } else if (urlObj.pathname.includes('shorts')) {
      const pathname = urlObj.pathname.split('/');
      return pathname[2];
    }
    return urlObj.searchParams.get('v');
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
