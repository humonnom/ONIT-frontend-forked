import React from 'react';

export default function ImageBox({ element }) {
  console.log('이미지 박스');
  console.log(element.widget_data.url);

  return (
    <>
      <img src={element.widget_data.url} alt='profile' style={imgStyle} />
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
