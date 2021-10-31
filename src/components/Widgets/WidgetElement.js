import React from 'react';
import { TYPE_IMAGE } from '../../utils/constantValue';
import ImageBox from './Image/ImageBox';

export function WidgetElement({ element }) {
  function classifyBox(curInfo) {
    if (curInfo.widget_type === TYPE_IMAGE) {
      return <ImageBox element={element} />;
    } else {
      return (
        <div
          key={curInfo.i}
          style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
        >
          <center className='text'>{curInfo.i}</center>
          <center>
            {curInfo.x}, {curInfo.y}
          </center>
        </div>
      );
    }
  }

  const layout = element;
  return (
    <div
      key={parseInt(layout.i, 10)}
      style={{
        backgroundColor: 'lightgray',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
      }}
    >
      {classifyBox(layout)}
    </div>
  );
}
