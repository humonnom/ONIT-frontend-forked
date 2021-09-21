import React from 'react';
import { css } from '@emotion/css';

function ToolBarButton(props) {
  return (
    <div
      className={css`
        margin: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <button
        onClick={props.action}
        className={css`
          background-color: #e0e0e0;
          padding: 5px 13px;
          border-radius: 4px;
          border: none;
          height: 32px;
          width: 45px;
          line-height: center;
        `}
        type='button'
      >
        {props.emoji}
      </button>
      <p
        className={css`
          font-size: x-small;
        `}
      >
        {props.label}
      </p>
    </div>
  );
}

export default ToolBarButton;
