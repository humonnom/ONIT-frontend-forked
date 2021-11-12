import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';

export default function ImageBox({ element }) {
  console.log('이미지 박스');
  const [hasLink, setHasLink] = useState(false);
  // TODO: 서버랑 맞추고 삭제할 부분
  const defaultImg =
    'https://www.thewindowsclub.com/wp-content/uploads/2018/06/Broken-image-icon-in-Chrome.gif';
  const img_src = element.widget_data.thumbnail || defaultImg;

  // console.log(img_src);
  //
  useEffect(() => {
    if (element.widget_data.url !== null) {
      setHasLink(true);
      console.log('has link');
    }
  }, []);

  return (
    <>
      {hasLink && (
        <a
          href={element.widget_data.url}
          target='_blank'
          rel='noreferrer'
          className={css`
            background-color: red;
            display: inline-block;
            width: 100%;
            height: 100%;
          `}
        >
          <img src={img_src} alt='profile' style={imgStyle} />
        </a>
      )}
      {!hasLink && <img src={img_src} alt='profile' style={imgStyle} />}
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
