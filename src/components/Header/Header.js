import React from 'react';
import { css } from '@emotion/css';
import { BasicButton, HeaderWrapper } from '..';

function Header(props) {
  return (
    <HeaderWrapper>
      <div
        className={css`
          margin: 10px;
          size: x-small;
        `}
      >
        onit
      </div>
      <div
        className={css`
          color: grey;
          margin: 10px;
        `}
      >
        <h3>Heom의 블로그</h3>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            font-size: 10px;
            margin-right: 30px;
          `}
        >
          <p>팔로워 | 100</p>
          <p>팔로잉 | 100</p>
        </div>
        <BasicButton
          label='Edit'
          onClick={() => window.location.assign('/edit')}
        />
      </div>
    </HeaderWrapper>
  );
}

export default Header;
