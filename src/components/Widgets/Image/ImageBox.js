import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';

export default function ImageBox({ element, mode }) {
  const [hasLink, setHasLink] = useState(false);
  // TODO: 디자이너분과 얘기한 후 이미지 받아오기
  const defaultImg =
    'https://www.thewindowsclub.com/wp-content/uploads/2018/06/Broken-image-icon-in-Chrome.gif';
  const img_src = element.widget_data.thumbnail || defaultImg;

  useEffect(() => {
    if (element.widget_data.url !== '') {
      setHasLink(true);
      console.log('has link');
    }
  }, []);

  return (
    <>
      {hasLink === true && mode === 'normal' ? (
        <a
          href={element.widget_data.url}
          target='_blank'
          rel='noreferrer'
          className={css`
            display: inline-block;
            width: 100%;
            height: 100%;
          `}
        >
          <img src={img_src} alt='profile' style={imgStyle} />
        </a>
      ) : (
        <img src={img_src} alt='profile' style={imgStyle} />
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
};
