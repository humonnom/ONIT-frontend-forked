// @ts-check
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useMemo } from 'react';
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
  const isGrid = useMemo(() => {
    return (
      <GridLayout mylayout={staticLayout} css={gridStyle}>
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

const gridStyle = css`
  position: relative;
  top: -5px;
  margin: 0 auto;
  width: 100%;
  min-width: 1124px;
`;

export default NormalModeGrid;
