import React from 'react';

export default function ImageBox({ element }) {
  console.log('이미지 박스');
  // TODO: 서버랑 맞추고 삭제할 부분
  const defaultImg =
    'https://www.thewindowsclub.com/wp-content/uploads/2018/06/Broken-image-icon-in-Chrome.gif';
  const img_src = element.widget_data.url || defaultImg;

  // console.log(img_src);
  //

  return (
    <>
      <img src={img_src} alt='profile' style={imgStyle} />
      {/* <img src={element.widget_data.url} alt='profile' style={imgStyle} /> */}
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
