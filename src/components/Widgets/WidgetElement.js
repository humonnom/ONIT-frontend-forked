import React from 'react';
import ImageBox from './Image/ImageBox';

export function WidgetElement({ element }) {
  function classifyBox(curInfo) {
    if (curInfo.widget_type === 0) return <ImageBox element={element} />;
    else {
      return (
        <div
          key={curInfo.i}
          style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
        >
          <center className='text'>{curInfo.i}</center>
        </div>
      );
    }
  }

  const layout = element;
  return (
    <div
      key={parseInt(layout.i, 10)}
      style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
    >
      {classifyBox(layout)}
    </div>
  );
}
