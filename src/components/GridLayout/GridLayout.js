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
    console.log(typeof layout[0].x);
    console.log(layout);
    this.state = { layout };
  }

  render() {
    const defaultProps = {
      className: 'layout',
      cols: 16,
      rowHeight: 79.5,
      onLayoutChange: function () {},
      compactType: null,
      preventCollision: true,
      // isResizable: true,
      // resizeHandles: ['se'],
    };

    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...defaultProps}
        {...this.props}
      >
        {this.props.children}
      </ReactGridLayout>
    );
  }
}
