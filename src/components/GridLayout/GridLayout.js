import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

export default class GridLayout extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    cols: 16,
    rowHeight: 79.5,
    onLayoutChange: function () {},
    verticalCompact: false,
    preventCollision: true,
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();

    console.log('this.is.layout');
    console.log(layout);
    this.state = { layout };
  }

  generateDOM() {
    return _.map(this.props.mylayout, function ({ i }) {
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

  generateLayout() {
    return this.props.mylayout;
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}
