import React from 'react';
import { css } from '@emotion/css';

function ToolBarButton(props) {
  return (
    <div
      className={css`
        margin: 0px 20px;
        width: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <button
        onClick={props.action}
        className={css`
          border: none;
          background-color: #fff;
        `}
        type='button'
      >
        <img
          alt='img'
          className={css`
            height: 26px;
          `}
          src={props.emoji}
        />
      </button>
    </div>
  );
}

export default ToolBarButton;
