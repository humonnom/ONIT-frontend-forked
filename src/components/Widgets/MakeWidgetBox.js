import React from 'react';
import ImageBox from './Image/ImageBox';

export function MakeWidgetBox({ element }) {
  //   function classifyBox(curInfo) {
  //     if (curInfo.i === '3') return ImageBox;
  //     return (
  //       <div
  //         key={curInfo.i}
  //         style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
  //       >
  //         <center className='text'>{curInfo.i}</center>
  //       </div>
  //     );
  //   }

  //   function generateDOM(layouts) {
  //     return layouts.map((layout) => {
  //       console.log('hihi');
  //       console.log(layout);
  //       return classifyBox(layout);
  //     });
  //   }

  const layout = element;
  return (
    <div
      key={Number(layout.i)}
      style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
    >
      <center className='text'>type: {layout.widget_type}</center>
    </div>
  );
}
