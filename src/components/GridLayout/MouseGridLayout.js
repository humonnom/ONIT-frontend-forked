import RGL, { WidthProvider } from 'react-grid-layout';
import './MouseGrid.css';
import useWindowSize from './useWindowSize';

const ReactGridLayout = WidthProvider(RGL);

export default function MouseGridLayout(props) {
  // rowHeight 공식 (width총길이 - margin * (col + 1)/ col)
  const rowHeight = (useWindowSize().width - 170) / 16;
  return (
    <ReactGridLayout
      layout={props.mylayout}
      className='layout mouse-layout'
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
