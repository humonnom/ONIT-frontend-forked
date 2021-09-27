import React from 'react';
import Cookies from 'js-cookie';
import { css } from '@emotion/css';
import { YoutubeVideo, Image } from '..';
import GridLayout from '../GridLayout/GridLayout';

const layout_info = [
  {
    i: '0',
    x: 1,
    y: 1,
    w: 2,
    h: 2,
    type: 'image',
    source: 'url',
  },
  { i: '1', x: 2, y: 4, w: 4, h: 2 },
  { i: '2', x: 10, y: 4, w: 4, h: 4 },
];

function EditAllWidgets(props) {
  const video = <YoutubeVideo embedId={Cookies.get('video')} />;
  const image = <Image src={Cookies.get('image')} />;

  return (
    <div style={{ position: 'relative' }}>
      <GridLayout
        onLayoutChange={(layout) => {
          console.log(layout);
        }}
        mylayout={layout_info}
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
