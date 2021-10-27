import React, { useState, useMemo } from 'react';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout from './GridLayout';
import { createReplacementWidgetsAction } from '../../redux/slice';
import { WidgetElement } from '../Widgets/WidgetElement';
import {
  ACTION_NONE,
  ACTION_CREATE,
  ACTION_EDIT,
} from '../../utils/constantValue';

function EditModeGrid(props) {
  const [open, setOpen] = useState(0);

  const dispatch = useDispatch();

  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));

  const layoutInfo = widgets.list;

  // function getNewWidetsList(origin, infos) {
  //   return origin.map(function (widget) {
  //     const newWidget = JSON.parse(JSON.stringify(widget));
  //     const info = infos.find((element) => element.i === widget.i);
  //     newWidget.x = info.x;
  //     newWidget.y = info.y;
  //     newWidget.w = info.w;
  //     newWidget.h = info.h;
  //     return newWidget;
  //   });
  // }

  // front server
  // i     widget_code
  // ""    만들어주는데
  // i
  // 임시로 하나 쓰다가
  // 상태가 create인것은 sever로 넘길때 빈문자열로 보내거나
  // 해야겠네요

  function renewWidgetsList(newItem) {
    const items = JSON.parse(JSON.stringify(widgets.list));
    console.log('widgets');
    console.log(widgets);
    console.log('items');
    console.log(items);
    const foundIndex = items.findIndex((element) => element.i === newItem.i);
    console.log(foundIndex);
    console.log(items[foundIndex]);
    items[foundIndex].x = newItem.x;
    items[foundIndex].y = newItem.y;
    items[foundIndex].w = newItem.w;
    items[foundIndex].h = newItem.h;
    // 생성된 위젯일 경우 action을 edit로 바꾸지 않음
    if (items[foundIndex].widget_action === ACTION_NONE) {
      items[foundIndex].widget_action = ACTION_EDIT;
    }
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        list: items,
      })
    );
  }

  const gridForm = useMemo(() => {
    setOpen(1);
    return (
      <GridLayout
        // onLayoutChange={(layout) => {
        //   console.log(`------beforeChanged-------`);
        //   console.log(widgets);
        //   const newWidgetsList = getNewWidetsList(widgets.list, layout);
        //   dispatch(
        //     createReplacementWidgetsAction({
        //       ...widgets,
        //       list: newWidgetsList,
        //     })
        //   );
        //   console.log('changed!');
        //   console.log(layout);
        // }}
        onDragStart={() => {
          console.log('드래그스타트');
        }}
        onResizeStop={(layout, oldItem, newItem) => {
          console.log('드래그정보입니다------');
          console.log(oldItem);
          console.log(newItem);
          renewWidgetsList(newItem);
        }}
        onDragStop={(layout, oldItem, newItem) => {
          console.log('드래그정보입니다------');
          console.log(oldItem);
          console.log(newItem);
          renewWidgetsList(newItem);
        }}
        mylayout={layoutInfo}
        style={gridStyle}
      >
        {layoutInfo.map(function (element) {
          return (
            <div
              key={element.i}
              style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
            >
              <WidgetElement element={element} />
            </div>
          );
        })}
      </GridLayout>
    );
  }, [layoutInfo]);

  return (
    <div style={{ position: 'relative' }}>
      {open === 1 ? <div>{gridForm}</div> : <div>test is undifined</div>}
    </div>
  );
}

export default EditModeGrid;

// about grid style
const height = 80;
const margin = 10;
const cols = 16;
const gridStyle = {
  margin: '0 auto',
  width: '100%',
  backgroundSize: `calc((100% - ${
    margin * (cols + 1)
  }px) / ${cols} + ${margin}px) ${height + margin}px`,
  backgroundPosition: `${margin / 2}px ${margin / 2}px`,
  backgroundImage: `linear-gradient(to right, #eee 1px, transparent 1px),
  linear-gradient(to bottom, #eee 1px, transparent 1px)`,
};
