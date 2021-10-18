import { React, useState } from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

function FGridLayout(props) {
  const layoutInfo = {
    className: 'layout',
    cols: 16,
    rowHeight: 79.5,
    onLayoutChange: function () {},
    verticalCompact: false,
    preventCollision: true,
  };
  const [itemInfo, setLayout] = useState({});

  function getProps() {
    setLayout({
      ...props.mylayout,
    });
    console.log('this.is.itemInfo');
    console.log(itemInfo);
  }
  
  function generateDOM() {

    return _.map(props.mylayout, function ({ i }) {
      return (
        <div
          key={i}
          style={{ backgroundColor: 'lightgray', borderRadius: '20px' }}
        >
          <center className='text'>{i}</center>
        </div>
      );
    });
  }

  return (
    <div>
      <ReactGridLayout layout={layoutInfo} {...itemInfo}>
        {generateDOM()}
      </ReactGridLayout>
    </div>
  );
}

export default FGridLayout;
