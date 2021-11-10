import React, { useState } from 'react';
import EditImage from './EditImage';

function NewImage(props) {
  const [startLeft, setStartLeft] = useState(0);
  const [left, setLeft] = useState('50%');
  const [startTop, setStartTop] = useState(0);
  const [top, setTop] = useState('50%');

  // 초기 위치는 50% -> 위치에 따라서 이동
  const popStyle = {
    position: 'fixed',
    zIndex: '12',
    top: `${top}`,
    left: `${left}`,
    margin: '5px',
    backgroundColor: '#c9c9c9',
    width: 'calc(100%/16)',
    height: '80px',
    textAlign: 'center',
    lineHeight: '80px',
  };

  return (
    <>
      <div
        className='droppable-element'
        draggable
        unselectable='on'
        // onMouseDown={(e) => {
        //   setStartTop(e.clientY - e.target.getBoundingClientRect().top);
        //   setStartLeft(e.clientX - e.target.getBoundingClientRect().left);
        // }}
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', '');
          props.getOnDragStart();
        }}
        // onDrag={(e) => {
        //   setLeft(`${e.clientX - startLeft + 2}px`);
        //   setTop(`${e.clientY - startTop + 2}px`);
        // }}
        onDragEnd={() => {
          props.getOnDragEnd();
        }}
        style={popStyle}
      >
        2x2
      </div>
    </>
  );
}
export default NewImage;
