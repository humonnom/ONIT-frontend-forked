import React from 'react';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout from '../GridLayout/GridLayout';
import { createReplacementWidgetAction } from '../../redux/slice';

function EditAllWidgets(props) {
  const dispatch = useDispatch();
  const { widget } = useSelector((state) => ({
    widget: state.info.widget,
  }));
  const layoutInfo = [widget];

  const updatePos = (newX, newY) => {
    dispatch(
      createReplacementWidgetAction({
        ...widget,
        y: newY,
        x: newX,
      })
    );
  };
  const handlePosUpdate = ({ i, x, y, w, h }) => {
    console.log('change');
    updatePos(x, y);
    console.log(x);
    console.log(y);
    console.log(widget.x);
    console.log(widget.y);
  };
  return (
    <div style={{ position: 'relative' }}>
      <GridLayout
        onLayoutChange={(layout) => {
          console.log(layout);
          console.log(layout[0]);
          // props.updatePos(3, 3);
          handlePosUpdate(layout[0]);
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
