import React from 'react';
import Cookies from 'js-cookie';
import { css } from '@emotion/css';
import { YoutubeVideo, Image } from '..';
import GridLayout from '../GridLayout/GridLayout';

function EditAllWidgets(props) {
  const video = <YoutubeVideo embedId={Cookies.get('video')} />;
  const image = <Image src={Cookies.get('image')} />;

  return (
    <div style={{ position: 'relative' }} {...props}>
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
