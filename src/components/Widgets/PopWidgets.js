import React from 'react';

function PopWidgets(props) {
  return (
    <div
      className='droppable-element'
      draggable
      unselectable='on'
      onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
      style={popStyle}
    >
      1x1
    </div>
  );
}
const popStyle = {
  margin: '5px',
  backgroundColor: '#c9c9c9',
  width: 'calc(100%/16)',
  height: '80px',
  textAlign: 'center',
  lineHeight: '80px',
};
export default PopWidgets;
