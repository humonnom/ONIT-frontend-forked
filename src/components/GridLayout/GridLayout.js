import React, { useRef } from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import './Grid.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../redux/slice';
import {
  ACTION_CREATE,
  ACTION_NONE,
  TYPE_IMAGE,
} from '../../utils/constantValue';
import { setNewWigetInfo } from '../Widgets/newWidgetUtils';
import UseWindowSize from './UseWindowSize';
import { logo_gray } from '../../asset';

const ReactGridLayout = WidthProvider(RGL);

export default function GridLayout(props) {
  // rowHeight 공식 (width총길이 - margin * (col + 1)/ col)
  const rowHeight = (UseWindowSize().width - 170) / 16;
  console.log(props.mylayout);
  console.log(props.children);
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
      {props.children ? (
        props.children
      ) : (
        <div key='-1'>
          <img alt='img' src={logo_gray} />
          {console.log('나 왔쪄염 뿌우')}
        </div>
      )}
    </ReactGridLayout>
  );
}

// 얘 안먹음 ㅠㅠ
GridLayout.defaultProps = {
  mylayout: [{ x: 0, y: 0, w: 2, h: 2, i: '-1' }],
};
