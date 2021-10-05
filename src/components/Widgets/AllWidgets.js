import React, { useState } from 'react';
import { css } from '@emotion/css';
import { useSelector } from 'react-redux';
import GridLayout from '../GridLayout/GridLayout';

function makeBlockStatic(layoutInfos) {
  return layoutInfos.map((info) => ({ ...info, static: true }));
}

function AllWidgets() {
  const { widget } = useSelector((state) => ({
    widget: state.info.widget,
  }));
  const layoutInfo = [widget];
  console.log(layoutInfo[0]);
  const staticLayout = makeBlockStatic(layoutInfo);

  return (
    <div style={{ position: 'relative' }}>
      <GridLayout
        onLayoutChange={(layout) => {
          console.log(layout);
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
