import React from 'react';
import { css } from '@emotion/css';
import { BasicButton, HeaderWrapper } from '..';
import { getPageUser } from '../../utils/parsing';

function Header({ userMatch }) {
  const user_seq = localStorage.getItem('user_seq');
  const page_user_seq = getPageUser();

  // TODO: user가 localStorage를 조작할 수 있으므로 확인할 방법이 필요함.
  // 해결책: editpage 렌더할때 확인한다.
  return (
    <HeaderWrapper>
      <a href='/main'>
        <div
          className={css`
            margin: 10px;
            size: x-small;
          `}
        >
          onit
        </div>
      </a>
      <div
        className={css`
          color: grey;
          margin: 10px;
        `}
      >
        <h3>{page_user_seq}의 블로그</h3>
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
        {userMatch && (
          <BasicButton
            label='Edit'
            onClick={() => window.location.assign(`/${user_seq}/edit`)}
          />
        )}
      </div>
    </HeaderWrapper>
  );
}

export default Header;
