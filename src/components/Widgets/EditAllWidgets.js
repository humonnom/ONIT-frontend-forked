import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout from '../GridLayout/GridLayout';
import { createReplacementWidgetsAction } from '../../redux/slice';

function EditAllWidgets(props) {
  /*
  const dispatch = useDispatch();

  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const layoutInfo = widgets.list;

  const updatePos = () => {
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
      })
    );
  };
  */

  // const handlePosUpdate = ({ i, x, y, w, h }) => {
  //   console.log('change');
  //   updatePos(x, y);
  //   console.log(x);
  //   console.log(y);
  //   console.log(widget.x);
  //   console.log(widget.y);
  // };

  const layoutInfo = [
    {
      i: 0,
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      i: 1,
      x: 1,
      y: 3,
      w: 2,
      h: 2,
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <GridLayout
        onLayoutChange={(layout) => {
          // console.log(layout);
        }}
        mylayout={layoutInfo}
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
