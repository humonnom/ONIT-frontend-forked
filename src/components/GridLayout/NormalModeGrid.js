// @ts-check
import React, { useMemo } from 'react';
import { css } from '@emotion/css';
import { useSelector } from 'react-redux';
import GridLayout from './GridLayout';
import { WidgetElement } from '../Widgets/WidgetElement';

function makeGridItemStatic(layoutInfos) {
  return layoutInfos.map((info) => ({ ...info, static: true }));
}

function NormalModeGrid() {
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const layoutInfo = widgets.list;
  const staticLayout = makeGridItemStatic(layoutInfo);
  console.log('static 넣어줌');
  console.log(staticLayout);

  const isGrid = useMemo(() => {
    console.log('----------render---------');
    return (
      <GridLayout
        mylayout={staticLayout}
        className={css`
          position: relative;
          top: -6px;
          margin: 0 auto;
          width: 100%;
        `}
      >
        {staticLayout.map((element) => (
          <div
            key={Number(element.i)}
            style={{ backgroundColor: 'white', borderRadius: '10px' }}
          >
            <WidgetElement element={element} mode='normal' />
          </div>
        ))}
      </GridLayout>
    );
  }, [staticLayout]);

  return <div style={{ position: 'relative' }}>{isGrid}</div>;
}

export default NormalModeGrid;
