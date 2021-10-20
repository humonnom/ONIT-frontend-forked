import React, { useState, useMemo } from 'react';
import { css } from '@emotion/css';
import { useSelector } from 'react-redux';
import GridLayout from '../GridLayout/GridLayout';
import { createReplacementWidgetsAction } from '../../redux/slice';
import { MakeWidgetBox } from './MakeWidgetBox';

function EditModeGrid(props) {
  const [open, setOpen] = useState(0);
  const [savedInfo, setSavedInfo] = useState();

  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const layoutInfo = widgets.list;

  const Test = useMemo(() => {
    console.log('----------render---------');
    setOpen(1);
    console.log(`open[in useMemo] : ${open}`);
    return (
      <GridLayout
        onLayoutChange={(layout) => {
          console.log('changed!');
          setSavedInfo(layout);
          console.log(layout);
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
      >
        {layoutInfo.map(function (element) {
          return (
            <div
              key={element.i}
              style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
            >
              <center className='text'>
                <MakeWidgetBox element={element} />
              </center>
            </div>
          );
        })}
      </GridLayout>
    );
  }, [layoutInfo]);

  return (
    <div style={{ position: 'relative' }}>
      <div
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
      {open === 1 ? <div>{Test}</div> : <div>test is undifined</div>}
    </div>
  );
}

export default EditModeGrid;
