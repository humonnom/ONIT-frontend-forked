import React, { useState, useMemo, useCallback } from 'react';
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
  console.log(`1: ${open}`);

  const dispatch = useDispatch();

  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  // 위젯 배열에서, 삭제상태(widget_action === 'D')인 위젯을 제외하고 새로운 배열 생성
  // 그림을 그리기 위한 임시 객체 배열, 원본을 수정하면 안됨
  // idx가 -1이면 action이 'D'인 요소를 찾지 못한것이므로 아무 처리하지 않음
  const getVisibleWidgetsList = useCallback(
    (oldList) => {
      const newList = oldList.filter(function (element) {
        return element.widget_action !== 'D';
      });
      // console.log(newList);
      return newList;
    },
    [widgets]
  );
  // TODO: 오늘 할일 2
  // const layoutInfo =
  // console.log(getVisibleWidgetsList(widgets.list));

  // 태호킴 이 부분을 봐주세요.
  const layoutInfo = getVisibleWidgetsList(widgets.list);
  console.log(getVisibleWidgetsList(widgets.list));
  // const layoutInfo = widgets.list;

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
  const gridForm = useMemo(() => {
    // setOpen(1);
    console.log(`2: ${open}`);
    return (
      <div style={gridStyle}>
        <GridLayout
          onResizeStop={(layout, oldItem, newItem) => {
            console.log('리덕스에 위젯 리스트 업데이트[EditModeGrid]');
            renewWidgetsList(newItem);
          }}
          onDragStop={(layout, oldItem, newItem) => {
            console.log('리덕스에 위젯 리스트 업데이트[EditModeGrid]');
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
      </div>
    );
  }, [layoutInfo]);

  return (
    <div style={{ position: 'relative' }}>
      {gridForm}
      {/* {open === 1 ? <div>{gridForm}</div> : <div>test is undifined</div>} */}
    </div>
  );
}

export default EditModeGrid;

// about grid style
const margin = 10;
const cols = 16;
const gridStyle = {
  margin: '10',
  width: '100%',
  height: '100%',
  backgroundSize: `calc((100% - ${margin}px) / ${cols}) calc((100vw - ${margin}px) / ${cols})`,
  backgroundPosition: `${margin / 2 - 1}px ${margin / 2 - 1}px`,
  backgroundImage: `linear-gradient(to right, #eee 2px, transparent 2px),
  linear-gradient(to bottom, #eee 2px, transparent 2px)`,
};

// grid공식 calc((100% - ${margin}px) / ${cols})
