import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout from './GridLayout';
import { createReplacementWidgetsAction } from '../../redux/slice';
import { WidgetElement } from '../Widgets/WidgetElement';
import { ACTION_NONE, ACTION_EDIT } from '../../utils/constantValue';
import { REAL_HEADER_HEIGHT } from '../../utils/style';

function EditModeGrid() {
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

  useEffect(() => {
    const newWidget = {
      i: '100',
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      widget_action: 'N',
    };
    console.log(layoutInfo);
    console.log(newWidget);
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        count: widgets.count + 1,
        list: [...widgets.list, newWidget],
      })
    );
    console.log(layoutInfo);
  }, []);

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

  const afterClick = (e) => {
    console.log(`${e.clientX}와 ${e.clientY}`);
    console.log(layoutInfo);
    const newData = { w: 1, h: 1, i: '100' };
    newData.x = Math.floor(e.clientX / 100);
    newData.y = Math.floor(e.clientY / 100);
    console.log(newData);
    renewWidgetsList(newData);
  };

  return (
    <>
      <div onMouseMove={afterClick} style={{ position: 'relative' }}>
        {gridForm}
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

// grid공식 calc((100% - ${margin}px) / ${cols})
