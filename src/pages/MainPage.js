import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, NormalWrapper, PageWrapper } from '../components';
import getWidgetsInfo from '../api/getWidgetsInfo';
import { createReplacementWidgetsAction } from '../redux/slice';

function MainPage() {
  return (
    <PageWrapper>
      <NormalWrapper>
        <Header pageType='main' />
        {/* <NormalModeGrid /> */}
        <div>다른 사람들 페이지 컴포넌트</div>
      </NormalWrapper>
    </PageWrapper>
  );
}

export default MainPage;
// import React from 'react';
// import { logout } from '../utils/logout';

// function MainPage(props) {
//   const user_seq = localStorage.getItem('user_seq');

//   return (
//     <div>
//       <h1>ONIT 🔥</h1>
//       <p>Main page</p>
//       <button
//         type='button'
//         onClick={() => {
//           window.location.assign(`/${user_seq}/normal`);
//         }}
//       >
//         my 페이지
//       </button>
//       <button
//         type='button'
//         onClick={() => {
//           window.location.assign(`/3/normal`);
//         }}
//       >
//         3번 유저의 페이지
//       </button>
//       <button
//         type='button'
//         onClick={() => {
//           window.location.assign(`/4/normal`);
//         }}
//       >
//         4번 유저의 페이지
//       </button>
//       <button
//         type='button'
//         onClick={() => {
//           logout();
//         }}
//       >
//         로그아웃
//       </button>
//     </div>
//   );
// }
