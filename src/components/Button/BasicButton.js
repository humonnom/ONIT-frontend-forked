import React from 'react';
import { css } from '@emotion/css';

function BasicButton(props) {
  return (
    <div className={css``}>
      <button onClick={props.onClick} type='button'>
        {props.label}
      </button>
    </div>
  );
}

export default BasicButton;
