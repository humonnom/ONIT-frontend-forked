/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout from './GridLayout';
import MouseGridLayout from './MouseGridLayout';
import { createReplacementWidgetsAction } from '../../redux/slice';
import { WidgetElement } from '../Widgets/WidgetElement';
import {
  ACTION_NONE,
  ACTION_EDIT,
  TYPE_MOUSE,
  TYPE_NONEDISPLAY,
  ACTION_CREATE,
  TYPE_NEW,
} from '../../utils/constantValue';
import useWindowSize from './useWindowSize';

function EditModeGrid() {
  const windowWidth = useWindowSize().width;
  const minWindowWidth = useMemo(() => {
    if (windowWidth > 1124) {
      return windowWidth;
    } else {
      return 1124;
    }
  }, [windowWidth]);

  const widgetDefaultValue = {
    i: '0',
    w: 1,
    h: 1,
    x: 0,
    y: 0,
    widget_type: TYPE_NONEDISPLAY,
    isResizable: false,
  };
  const [isWidgetOverlap, setisWidgetOverlap] = useState(false);
  const [mouseOverWidget, setMouseOverWidget] = useState([widgetDefaultValue]);

  const dispatch = useDispatch();
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));

  // delete처리 된 위젯은 그리드에 띄우지 않기 위해 필터링해줌
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

  // 빈 그리드 클릭 시 툴바 생성 기능
  const sendToolbarInfo = () => {
    if (isWidgetOverlap === false) {
      makeNewWidget();
    }
  };

  function makeNewWidget() {
    const newWidget = {
      widget_action: ACTION_CREATE,
      widget_code: '',
      widget_type: TYPE_NEW,
      widget_data: {
        thumbnail: ``,
        url: '',
      },
      i: `${widgets.count + 1}`,
      x: mouseOverWidget[0].x,
      y: mouseOverWidget[0].y,
      w: 2,
      h: 2,
      isResizable: false,
    };

    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        count: widgets.count + 1,
        list: [...widgets.list, newWidget],
      })
    );
  }

  // 그리드 수정 시 변경된 정보를 dispatch로 전송해줌.
  function renewWidgetsList(newItem) {
    const items = JSON.parse(JSON.stringify(widgets.list));
    const found = items.find((element) => element.i === newItem.i);
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

  // 마우스오버 위젯 그리드(기존 그리드와 레이어 되어 있음)
  const mouseOverWidgetGridForm = useMemo(() => {
    return (
      <MouseGridLayout style={mouseOverGridStyle} mylayout={mouseOverWidget}>
        <div key='0'>
          <WidgetElement element={mouseOverWidget[0]} mode='normal' />
        </div>
      </MouseGridLayout>
    );
  }, [mouseOverWidget]);

  // 마우스 위치를 계산하기 위한 함수
  const mouseWidget = (e) => {
    if (isWidgetOverlap === false && e.clientX > 5) {
      const newData = { w: 1, h: 1, i: '0', widget_type: TYPE_MOUSE };
      newData.x = Math.floor(((e.clientX - 5) * 16) / (minWindowWidth - 10));
      newData.y = Math.floor((e.pageY * 16) / (minWindowWidth - 10));
      setMouseOverWidget([
        {
          ...newData,
          isResizable: false,
        },
      ]);
    } else {
      setMouseOverWidget([widgetDefaultValue]);
    }
  };

  // about grid style
  const margin = 10;
  const cols = 16;
  const gridStyle = {
    position: 'relative',
    top: '-5px',
    margin: '10',
    width: '100%',
    minWidth: '1124px',
    minHeight: `100vh`,
    backgroundSize: `calc((${minWindowWidth}px - ${margin}px) / ${cols}) calc((${minWindowWidth}px - ${margin}px) / ${cols})`,
    backgroundPosition: `${margin / 2 - 2}px ${margin / 2 - 1}px`,
    backgroundImage: `linear-gradient(to right, #eee 2px, transparent 2px),
  linear-gradient(to bottom, #eee 2px, transparent 2px)`,
  };
  // grid공식 가로 calc((100% - ${margin}px) / ${cols}) calc((100% - ${margin}px - X좌표 스크롤바픽셀) / ${cols})

  return (
    <>
      <button
        type='button'
        onMouseMove={mouseWidget}
        onMouseEnter={() => {}}
        onMouseLeave={() => {
          setMouseOverWidget([widgetDefaultValue]);
        }}
        onClick={sendToolbarInfo}
        css={removeBtnCss}
      >
        <GridLayout
          style={gridStyle}
          onResizeStart={() => {
            setisWidgetOverlap(true);
          }}
          onResizeStop={(layout, oldItem, newItem) => {
            renewWidgetsList(newItem);
          }}
          onResize={() => {
            setisWidgetOverlap(true);
          }}
          onDragStart={() => {
            setisWidgetOverlap(true);
          }}
          onDrag={() => {
            setisWidgetOverlap(true);
          }}
          onDragStop={(layout, oldItem, newItem) => {
            renewWidgetsList(newItem);
          }}
          mylayout={layoutInfo}
        >
          {layoutInfo.map(function (element) {
            return (
              <div
                key={Number(element.i)}
                style={{
                  backgroundColor: 'lightgray',
                  borderRadius: '10px',
                  width: 'calc(100% + 20px)',
                }}
                onMouseEnter={() => {
                  setisWidgetOverlap(true);
                }}
                onMouseLeave={() => {
                  setisWidgetOverlap(false);
                }}
              >
                <WidgetElement element={element} mode='edit' />
                <div css={mouseOverWidgetGard} />
              </div>
            );
          })}
        </GridLayout>
        {mouseOverWidgetGridForm}
      </button>
    </>
  );
}

export default EditModeGrid;

const mouseOverWidgetGard = css`
  position: absolute;
  top: -6px;
  left: -6px;
  margin: 0;
  padding: 0;
  border: 0;
  width: calc(100% + 13px);
  height: calc(100% + 13px);
  background-color: rgba(0, 0, 0, 0);
  z-index: -999;
`;

const removeBtnCss = css`
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
`;

const mouseOverGridStyle = {
  position: 'absolute',
  top: '-5px',
  left: '0px',
  margin: '10',
  width: '100%',
  minWidth: '1124px',
  minHeight: `100vh`,
  zIndex: '-100',
};
