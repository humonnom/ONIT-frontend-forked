import React, { useState } from 'react';
import { YoutubeVideo } from '../..';

export default function VideoBox({ element }) {
  function getVideoCode(url) {
    const urlObj = new URL(url);
    const code = urlObj.searchParams.get('v');
    return code;
  }

  console.log('비디오 박스');
  const defaultImg =
    'https://www.thewindowsclub.com/wp-content/uploads/2018/06/Broken-image-icon-in-Chrome.gif';
  const videoCode = getVideoCode(element.widget_data.url) || '';

  console.log(videoCode);
  return (
    <>
      {videoCode === '' && (
        <img src={defaultImg} alt='profile' style={imgStyle} />
      )}
      {videoCode !== '' && <YoutubeVideo embedId={videoCode} />}
    </>
  );
}

// style
const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '10px',
};
