import React, { useState } from 'react';
import { css } from '@emotion/css';
import GridLayout from '../GridLayout/GridLayout';

function makeBlockStatic(layoutInfos) {
  return layoutInfos.map((info) => ({ ...info, static: true }));
}

function AllWidgets(props) {
  const staticLayout = makeBlockStatic(props.layoutInfo);

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
