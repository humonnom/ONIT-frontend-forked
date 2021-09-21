import React from 'react';
import { css } from '@emotion/css';

function BasicButton(props) {
  return (
    <div
      className={css`
        position: absolute;
        right: 20px;
        top: 20px;
      `}
    >
      <button onClick={props.onClick} type='button'>
        {props.label}
      </button>
    </div>
  );
}

export default BasicButton;
