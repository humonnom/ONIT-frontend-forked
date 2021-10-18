import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import './Grid.css';

const ReactGridLayout = WidthProvider(RGL);

export default class GridLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    const layout = this.props.mylayout;

    console.log('this.is.layout');
    console.log(layout);
    this.state = { layout };
  }

  generateDOM() {
    return _.map(this.props.mylayout, function ({ i }) {
      return (
        <div
          key={i}
          style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
        >
          <center className='text'>{i}</center>
        </div>
      );
    });
  }

  render() {
    const Props = {
      className: 'layout',
      cols: 16,
      rowHeight: 79.5,
      onLayoutChange: function () {},
      verticalCompact: false,
      preventCollision: true,
      // isResizable: true,
      // resizeHandles: ['se'],
    };

    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...Props}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}
