import React from 'react';
import { css } from '@emotion/css';
import GridLayout from '../GridLayout/GridLayout';

function EditAllWidgets(props) {
  return (
    <div style={{ position: 'relative' }}>
      <GridLayout
        onLayoutChange={(layout) => {
          console.log(layout);
        }}
        mylayout={props.layoutInfo}
        className={css`
          margin: 0 auto;
          width: 100%;
          z-index: 2;
          background-size: calc(100% / 16) 40px;
          background-position: 5px 5px;
          background-image: linear-gradient(to right, #eee 1px, transparent 1px),
            linear-gradient(to bottom, #eee 1px, transparent 1px);
        `}
      />
    </div>
  );
}

export default EditAllWidgets;
