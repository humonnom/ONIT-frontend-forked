import React from 'react';

export default function ImageBox({ element }) {
  console.log('하이');
  console.log(element.widget_data.url);
  return (
    <>
      <img src={element.widget_data.url} alt='profile' />
    </>
  );
}
