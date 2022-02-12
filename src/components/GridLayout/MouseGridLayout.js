import { useMemo } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import './MouseGrid.css';
import useWindowSize from './useWindowSize';

const ReactGridLayout = WidthProvider(RGL);

export default function MouseGridLayout(props) {
  const windowWidth = useWindowSize().width;
  const minRowHieght = useMemo(() => {
    if (windowWidth > 1124) {
      return (windowWidth - 170) / 16;
    } else {
      return (1124 - 170) / 16;
    }
  }, [windowWidth]);
  // rowHeight 공식 (width총길이 - margin * (col + 1)/ col)

  return (
    <ReactGridLayout
      layout={props.mylayout}
      className='layout mouse-layout'
      cols={16}
      rowHeight={minRowHieght}
      margin={[10, 10]}
      compactType={null}
      preventCollision
      {...props}
    >
      {props.children}
    </ReactGridLayout>
  );
}
