import React, { useState } from 'react';
import { YoutubeVideo } from '../..';

export default function VideoBox({ element, mode }) {
  function getVideoCode(url) {
    const urlObj = new URL(url);
    const code = urlObj.searchParams.get('v');
    return code;
  }

  console.log('비디오 박스');
  const videoCode = getVideoCode(element.widget_data.thumbnail) || '';
  const thumbnail = `https://img.youtube.com/vi/${videoCode}/mqdefault.jpg`;

  console.log('이거 비디오 코드임');
  console.log(videoCode);
  return (
    <>
      {mode === 'normal' && videoCode !== '' ? (
        videoCode !== '' && <YoutubeVideo embedId={videoCode} />
      ) : (
        <img src={thumbnail} alt='profile' style={imgStyle} />
      )}
    </>
  );
}

// style
const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '10px',
  background: '#000',
};
