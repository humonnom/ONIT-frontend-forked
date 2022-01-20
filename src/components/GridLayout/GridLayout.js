import RGL, { WidthProvider } from 'react-grid-layout';
import './Grid.css';
import UseWindowSize from './UseWindowSize';

const ReactGridLayout = WidthProvider(RGL);

export default function GridLayout(props) {
  // rowHeight 공식 (width총길이 - margin * (col + 1)/ col)
  const rowHeight = (UseWindowSize().width - 170) / 16;

  return (
    <ReactGridLayout
      layout={props.mylayout}
      className='layout'
      cols={16}
      rowHeight={rowHeight}
      margin={[10, 10]}
      compactType={null}
      preventCollision
      {...props}
    >
      {props.children}
    </ReactGridLayout>
  );
}
