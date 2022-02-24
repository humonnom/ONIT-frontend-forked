import { useMemo } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import './Grid.css';
import useWindowSize from './useWindowSize';

const ReactGridLayout = WidthProvider(RGL);

const margin = [10, 10];

export default function GridLayout(props) {
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
      className='layout'
      cols={16}
      rowHeight={minRowHieght}
      margin={margin}
      compactType={null}
      preventCollision
      {...props}
    >
      {props.children}
    </ReactGridLayout>
  );
}
