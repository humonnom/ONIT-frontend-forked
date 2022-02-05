import React from 'react';
import { YoutubeVideo } from '../..';

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
