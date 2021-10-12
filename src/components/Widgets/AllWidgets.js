import React, { useState } from 'react';
import { css } from '@emotion/css';
import { useSelector } from 'react-redux';
import GridLayout from '../GridLayout/GridLayout';

function makeBlockStatic(layoutInfos) {
  return layoutInfos.map((info) => ({ ...info, static: true }));
}

function AllWidgets() {
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const layoutInfo = widgets.list;
  console.log(layoutInfo);
  const staticLayout = makeBlockStatic(layoutInfo);
  console.log(staticLayout);

  return (
    <div style={{ position: 'relative' }}>
      <GridLayout
        onLayoutChange={(layout) => {
          // console.log(staticLayout);
        }}
        mylayout={staticLayout}
        className={css`
          margin: 0 auto;
          width: 100%;
          z-index: 2;
        `}
      />
    </div>
  );
}

export default AllWidgets;
