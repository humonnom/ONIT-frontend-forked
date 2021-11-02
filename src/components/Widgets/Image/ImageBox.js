import React from 'react';

export default function ImageBox({ element }) {
  console.log('이미지 박스');
  // TODO: 서버랑 맞추고 삭제할 부분
  let img_src = element.widget_data.url;
  if (element.widget_data.url === 'https://image/address123123123') {
    img_src =
      'https://66.media.tumblr.com/5ebc86e0bd572234d531d689ddc60189/2fb007392bed656c-d4/s1280x1920/199d678514d896d873ffe90400d3671d5301df40.jpg';
  }
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
