import RGL, { WidthProvider } from 'react-grid-layout';
import './MouseGrid.css';
import useWindowSize from './useWindowSize';

const ReactGridLayout = WidthProvider(RGL);

export default function MouseGridLayout(props) {
  // rowHeight 공식 (width총길이 - margin * (col + 1)/ col)
  const rowHeight = (useWindowSize().width - 170) / 16;
  console.log(props.mylayout);
  function makeGridItemStatic(layoutInfos) {
    return layoutInfos.map((info) => ({ ...info, static: true }));
  }
  const staticLayout = makeGridItemStatic(props.mylayout);
  return (
    <ReactGridLayout
      layout={staticLayout}
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
