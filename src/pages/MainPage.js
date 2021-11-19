import React from 'react';
import { logout } from '../utils/logout';

function MainPage(props) {
  const user_seq = localStorage.getItem('user_seq');

  return (
    <div>
      <h1>ONIT 🔥</h1>
      <p>Main page</p>
      <button
        type='button'
        onClick={() => {
          window.location.assign(`/${user_seq}/normal`);
        }}
      >
        my 페이지
      </button>
      <button
        type='button'
        onClick={() => {
          window.location.assign(`/3/normal`);
        }}
      >
        3번 유저의 페이지
      </button>
      <button
        type='button'
        onClick={() => {
          window.location.assign(`/4/normal`);
        }}
      >
        4번 유저의 페이지
      </button>
      <button
        type='button'
        onClick={() => {
          logout();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}

export default MainPage;
