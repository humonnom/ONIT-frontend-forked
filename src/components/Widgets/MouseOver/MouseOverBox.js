/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { mouseover_widget } from '../../../asset';
import useWindowSize from '../../GridLayout/useWindowSize';

function MouseOverBox() {
  const widgetWidth = (useWindowSize().width - 170) / 16 + 10;

  const remmoveBtnCss = css`
    position: relative;
    top: -5px;
    left: -5px;
    margin: 0;
    padding: 0;
    border: 0;
    width: ${widgetWidth - 1}px;
    height: ${widgetWidth}px;
  `;

  return (
    <button css={[remmoveBtnCss]} type='button'>
      <img alt='img' width='100%' height='100%' src={mouseover_widget} />
    </button>
  );
}

export default MouseOverBox;
