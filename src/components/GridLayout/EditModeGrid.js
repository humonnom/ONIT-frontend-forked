/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFloating, shift } from '@floating-ui/react-dom';
import GridLayout from './GridLayout';
import MouseGridLayout from './MouseGridLayout';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../redux/slice';
import { WidgetElement } from '../Widgets/WidgetElement';
import { WIDGET_COMMON_RADIUS } from '../../styles/style';
import {
  ACTION_NONE,
  ACTION_EDIT,
  TYPE_MOUSE,
  TYPE_NONEDISPLAY,
  ACTION_CREATE,
  TYPE_NEW,
} from '../../utils/constantValue';
import useWindowSize from './useWindowSize';
import ToolBar from '../ToolBar/ToolBar';

const widgetDefaultValue = {
  i: '0',
  w: 1,
  h: 1,
  x: 0,
  y: 0,
  widget_type: TYPE_NONEDISPLAY,
  isResizable: false,
};

function EditModeGrid() {
  const windowWidth = useWindowSize().width;
  const minWindowWidth = useMemo(() => {
    if (windowWidth > 1124) {
      return windowWidth;
    } else {
      return 1124;
    }
  }, [windowWidth]);

  const [isWidgetOverlap, setIsWidgetOverlap] = useState(false);
  const [mouseOverWidget, setMouseOverWidget] = useState([widgetDefaultValue]);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const { x, y, floating, reference, strategy, update } = useFloating({
    placement: 'top-right',
    middleware: [shift()],
  });

  const dispatch = useDispatch();
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));

  // delete처리 된 위젯은 그리드에 띄우지 않기 위해 필터링해줌
  const layoutInfo = useMemo(() => {
    const newList = widgets.list.filter(function (element) {
      return element.widget_action !== 'D';
    });
    return newList;
  }, [widgets]);

  useEffect(() => {
    console.log('layoutInfo', layoutInfo);
  }, [layoutInfo]);

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
    };

    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        count: widgets.count + 1,
        list: [...widgets.list, newWidget],
      })
    );
    dispatch(
      createReplacementModalAction({
        ...modal,
        toolbarWindow: true,
      })
    );
  }

  // 그리드 수정 시 변경된 정보를 dispatch로 전송해줌.
  const renewWidgetsList = useCallback(
    (newItem) => {
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
    },
    [widgets]
  );

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
  // usecallback으로 감싸면 왜인지 값이 틀리게 나옴 -> 이유는 나중에 꼭 알아볼 것
  const mouseWidgetPosition = (e) => {
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
  const gridStyle = useMemo(
    () => ({
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
    }),
    [minWindowWidth, margin, cols]
  );
  // grid공식 가로 calc((100% - ${margin}px) / ${cols}) calc((100% - ${margin}px - X좌표 스크롤바픽셀) / ${cols})

  useEffect(() => {
    console.log('selectedWidget', selectedWidget);
  }, [selectedWidget]);

  const setOverlapTrue = useCallback(() => {
    setIsWidgetOverlap(true);
  }, [setIsWidgetOverlap]);

  const setOverlapFalse = useCallback(() => {
    setIsWidgetOverlap(false);
  }, [setIsWidgetOverlap]);

  const onListChanged = useCallback(
    (layout, oldItem, newItem) => {
      renewWidgetsList(newItem);
    },
    [renewWidgetsList]
  );

  const initMouseOverWidget = useCallback(() => {
    setMouseOverWidget([widgetDefaultValue]);
  }, [setMouseOverWidget]);

  const gridLayoutItems = useMemo(() => {
    return layoutInfo.map((element) => {
      return (
        <div
          key={element.i}
          css={gridLayoutItemStyle}
          onMouseEnter={setOverlapTrue}
          onMouseLeave={setOverlapFalse}
        >
          <div
            css={widgetWrapperStyle}
            ref={(ref) => {
              if (ref && element.i === selectedWidget) {
                reference(ref);
                update();
              }
            }}
          >
            <WidgetElement
              element={element}
              mode='edit'
              setSelectedWidget={setSelectedWidget}
              setIsWidgetOverlap={setIsWidgetOverlap}
            />
          </div>
          <div css={mouseOverWidgetGuardStyle} />
        </div>
      );
    });
  }, [layoutInfo, selectedWidget, setSelectedWidget]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        onMouseMove={mouseWidgetPosition}
        onMouseLeave={initMouseOverWidget}
        onClick={sendToolbarInfo}
        css={removeBtnStyle}
      >
        <GridLayout
          style={gridStyle}
          onResizeStart={setOverlapTrue}
          onResizeStop={onListChanged}
          onResize={setOverlapTrue}
          onDragStart={setOverlapTrue}
          onDrag={setOverlapTrue}
          onDragStop={onListChanged}
          mylayout={layoutInfo}
        >
          {gridLayoutItems}
        </GridLayout>
        {selectedWidget && (
          <div
            ref={floating}
            style={{
              position: strategy,
              top: y ?? '20px',
              left: x ?? '',
            }}
          >
            <ToolBar />
          </div>
        )}
        {mouseOverWidgetGridForm}
      </div>
    </>
  );
}

export default EditModeGrid;

const widgetWrapperStyle = css`
  height: 100%;
`;

const gridLayoutItemStyle = css`
  background-color: lightgray;
  border-radius: ${WIDGET_COMMON_RADIUS};
  width: calc(100% + 20px);
`;

const mouseOverWidgetGuardStyle = css`
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

const removeBtnStyle = css`
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
