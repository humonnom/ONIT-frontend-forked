import React, { useEffect, useState, useMemo } from 'react';
import { css } from '@emotion/css';
import { useSelector } from 'react-redux';
import GridLayout from '../GridLayout/GridLayout';
import getWidgetsInfo from '../../api/getWidgetsInfo';
import { MakeWidgetBox } from './MakeWidgetBox';

function makeBlockStatic(layoutInfos) {
  return layoutInfos.map((info) => ({ ...info, static: true }));
}

function NormalModeGrid() {
  const [open, setOpen] = useState(0);

  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const layoutInfo = widgets.list;
  const staticLayout = makeBlockStatic(layoutInfo);
  console.log('static 넣어줌');
  console.log(staticLayout);

  const Test = useMemo(() => {
    console.log('----------render---------');
    setOpen(1);
    console.log(`open[in useMemo] : ${open}`);
    return (
      <GridLayout
        onLayoutChange={(layout) => {
          console.log('normalnoed changed!');
          console.log(layout);
        }}
        mylayout={staticLayout}
        className={css`
          margin: 0 auto;
          width: 100%;
        `}
      >
        {layoutInfo.map(function (element) {
          return (
            <div
              key={Number(element.i)}
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

  if (staticLayout.i !== undefined) setOpen(1);
  return (
    <div style={{ position: 'relative' }}>
      {open === 1 ? <div>{Test}</div> : <div>test is undifined</div>}
    </div>
  );
}

export default NormalModeGrid;
