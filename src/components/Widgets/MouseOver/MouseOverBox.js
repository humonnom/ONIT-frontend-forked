/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useMemo } from 'react';
import { mouseover_widget } from '../../../asset';
import useWindowSize from '../../GridLayout/useWindowSize';

function MouseOverBox() {
  const windowWidth = useWindowSize().width;
  const minRowHieght = useMemo(() => {
    if (windowWidth > 1124) {
      return (windowWidth - 170) / 16 + 10;
    } else {
      return (1124 - 170) / 16 + 10;
    }
  }, [windowWidth]);
  // rowHeight 공식 (width총길이 - margin * (col + 1)/ col) + margin

  const remmoveBtnCss = css`
    position: relative;
    top: -5px;
    left: -5px;
    margin: 0;
    padding: 0;
    border: 0;
    width: ${minRowHieght - 1}px;
    height: ${minRowHieght}px;
    background-color: rgba(0, 0, 0, 0);
  `;

  return (
    <div css={[remmoveBtnCss]}>
      <img alt='img' width='100%' height='100%' src={mouseover_widget} />
    </div>
  );
}

export default MouseOverBox;
