import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout from './GridLayout';
import { createReplacementWidgetsAction } from '../../redux/slice';
import { WidgetElement } from '../Widgets/WidgetElement';
import { ACTION_NONE, ACTION_EDIT } from '../../utils/constantValue';
import { REAL_HEADER_HEIGHT } from '../../utils/style';
import useWindowSize from './useWindowSize';

/* eslint no-unused-vars: 0 */

function EditModeGrid() {
  const rowWidth = useWindowSize().width;
  const [mouseOverWidget, setMouseOverWidget] = useState([
    {
      i: '0',
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      widget_type: 'mouse',
      widget_action: 'N',
    },
  ]);

  const dispatch = useDispatch();

  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));

  const getVisibleWidgetsList = useMemo(
    () => () => {
      const newList = widgets.list.filter(function (element) {
        return element.widget_action !== 'D';
      });
      return newList;
    },
    [widgets]
  );

  const layoutInfo = getVisibleWidgetsList(widgets.list);

  function renewWidgetsList(newItem) {
    const items = JSON.parse(JSON.stringify(widgets.list));
    const found = items.find((element) => element.i === newItem.i);
    console.log(items);
    console.log(found);
    console.log(newItem);
    found.x = newItem.x;
    found.y = newItem.y;
    found.w = newItem.w;
    found.h = newItem.h;
    if (found.widget_action === ACTION_NONE || found.widget_code !== '') {
      found.widget_action = ACTION_EDIT;
    }
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        list: items,
      })
    );
  }

  // useEffect(() => {
  //   console.log(mouseOverWidget);
  // }, [mouseOverWidget]);

  const mouseOverWidgetGridForm = useMemo(
    () => (
      <GridLayout style={mouseOverGridStyle} mylayout={mouseOverWidget}>
        <div
          key={Number(mouseOverWidget[0].i)}
          style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
        >
          <WidgetElement element={mouseOverWidget[0]} mode='normal' />
        </div>
      </GridLayout>
    ),
    [mouseOverWidget]
  );

  const gridForm = useMemo(
    () => (
      <GridLayout
        style={gridStyle}
        onResizeStop={(layout, oldItem, newItem) => {
          // console.log('리덕스에 위젯 리스트 업데이트[EditModeGrid]');
          renewWidgetsList(newItem);
        }}
        onDragStop={(layout, oldItem, newItem) => {
          // console.log('리덕스에 위젯 리스트 업데이트[EditModeGrid]');
          renewWidgetsList(newItem);
        }}
        mylayout={layoutInfo}
      >
        {layoutInfo.map(function (element) {
          return (
            <div
              key={Number(element.i)}
              style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
            >
              <WidgetElement element={element} mode='edit' />
            </div>
          );
        })}
      </GridLayout>
    ),
    [layoutInfo]
  );

  const mouseWidget = (e) => {
    console.log(`${e.clientX}와 ${e.clientY}`);
    const newData = { w: 1, h: 1, i: '0' };
    newData.x = Math.floor((e.clientX * 16) / rowWidth);
    newData.y = Math.floor(((e.clientY - 57) * 16) / rowWidth);
    setMouseOverWidget([
      {
        ...newData,
      },
    ]);
  };

  return (
    <>
      <div onMouseMove={mouseWidget} style={{ position: 'relative' }}>
        {gridForm}
        {mouseOverWidgetGridForm}
      </div>
    </>
  );
}

export default EditModeGrid;

// about grid style
const margin = 10;
const cols = 16;
const gridStyle = {
  position: 'relative',
  top: '-5px',
  margin: '10',
  width: '100%',
  minWidth: '1124px',
  minHeight: `calc(100vh - ${REAL_HEADER_HEIGHT})`,
  backgroundSize: `calc((100% - ${margin}px) / ${cols}) calc((100vw - ${margin}px) / ${cols})`,
  backgroundPosition: `${margin / 2 - 1}px ${margin / 2 - 1}px`,
  backgroundImage: `linear-gradient(to right, #eee 2px, transparent 2px),
  linear-gradient(to bottom, #eee 2px, transparent 2px)`,
};

const mouseOverGridStyle = {
  position: 'absolute',
  top: '-5px',
  left: '0px',
  margin: '10',
  width: '100%',
  minWidth: '1124px',
  minHeight: `calc(100vh - ${REAL_HEADER_HEIGHT})`,
  zIndex: '-100',
};

// grid공식 calc((100% - ${margin}px) / ${cols})
