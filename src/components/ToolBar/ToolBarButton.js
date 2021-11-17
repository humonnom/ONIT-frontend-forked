import React, { useState } from 'react';
import { css } from '@emotion/css';

function ToolBarButton(props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={css`
        margin: 0px 20px;
        width: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {isHover ? (
        <>
          <button
            onClick={props.action}
            className={css`
              border: none;
              line-height: center;
              background-color: #fff;
            `}
            type='button'
          >
            <img
              alt='img'
              className={css`
                height: 26px;
              `}
              src={props.selected}
            />
          </button>
          <p
            className={css`
              font-size: x-small;
              color: #ef6408;
              margin: 0px;
            `}
          >
            {props.label}
          </p>
        </>
      ) : (
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
      )}
    </div>
  );
}

export default ToolBarButton;
