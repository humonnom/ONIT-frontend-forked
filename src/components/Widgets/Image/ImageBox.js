/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

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

  const remmoveBtnCss = css`
    position: absolute;
    top: -5px;
    left: -5px;
    margin: 0;
    padding: 0;
    border: 0;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    background-color: black;
    z-index: -999;
  `;

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
        <>
          <img src={img_src} alt='profile' style={imgStyle} />
          <div css={remmoveBtnCss} />
        </>
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
