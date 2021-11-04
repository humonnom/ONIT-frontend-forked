import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TYPE_IMAGE } from '../../utils/constantValue';
import ImageBox from './Image/ImageBox';

export function WidgetElement({ element, mode }) {
  const [hover, setHover] = useState(false);
  const layout = element;

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

  return (
    <div
      key={parseInt(layout.i, 10)}
      style={{
        backgroundColor: 'lightgray',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {mode === 'edit' && hover && (
        <>
          <button
            type='button'
            style={{ position: 'absolute', top: '5px', right: '35px' }}
          >
            E
          </button>
          <button
            type='button'
            style={{ position: 'absolute', top: '5px', right: '5px' }}
            onClick={() => {
              // 여기에 기능을 넣어주시면 되는데
              // n이 잘 나오는데 왜 값을 바꾸려하면 터질까요?
              console.log(layout.widget_action);
            }}
          >
            X
          </button>
        </>
      )}
      {classifyBox(layout)}
    </div>
  );
}
