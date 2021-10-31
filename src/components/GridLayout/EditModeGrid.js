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

  function renewWidgetsList(newItem) {
    const items = JSON.parse(JSON.stringify(widgets.list));
    console.log(newItem);
    const found = items.find((element) => element.i === newItem.i);
    console.log(items);
    console.log(found);
    console.log(newItem);
    found.x = newItem.x;
    found.y = newItem.y;
    found.w = newItem.w;
    found.h = newItem.h;
    // 생성된 위젯일 경우 action을 edit로 바꾸지 않음
    if (found.widget_action === ACTION_NONE) {
      found.widget_action = ACTION_EDIT;
    }
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        list: items,
      })
    );
  }
  // }, [dispatch]);
  const gridForm = useMemo(() => {
    setOpen(1);
    return (
      <GridLayout
        // onDragStart={() => {
        //   console.log('start');
        // }}
        onResizeStop={(rayout, oldItem, newItem) => {
          // console.log("리덕스에 위젯 리스트 업데이트[EditModeGrid]");
          renewWidgetsList(newItem);
        }}
        onDragStop={(rayout, oldItem, newItem) => {
          // console.log("리덕스에 위젯 리스트 업데이트[EditModeGrid]");
          renewWidgetsList(newItem);
        }}
        mylayout={layoutInfo}
        style={gridStyle}
      >
        {layoutInfo.map(function (element) {
          return (
            <div
              key={Number(element.i)}
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
