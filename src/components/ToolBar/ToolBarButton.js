import React from 'react';
import { css } from '@emotion/css';
import { COLOR_GREY, BUTTON_HEIGHT, BUTTON_WIDTH } from '../../utils/style';

function ToolBarButton(props) {
  return (
    <div
      className={css`
        margin: 0px 5px;
        ${'' /* background-color: red; */}
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <button
        onClick={props.action}
        className={css`
          background-color: ${COLOR_GREY};
          border-radius: 4px;
          border: none;
          height: ${BUTTON_HEIGHT};
          width: ${BUTTON_WIDTH};
          line-height: center;
        `}
        type='button'
      >
        {props.emoji}
      </button>
      <p
        className={css`
          font-size: x-small;
          ${'' /* background-color: blue; */}
          margin: 0px;
        `}
      >
        {props.label}
      </p>
    </div>
  );
}

export default ToolBarButton;
