/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Header, NormalWrapper, PageWrapper } from '../components';
import getWidgetsInfo from '../api/getWidgetsInfo';
import { createReplacementWidgetsAction } from '../redux/slice';
import {
  MainPage01,
  MainPage02,
  MainPage03,
  MainPage04,
  MainPage05,
  MainPage06,
  MainPage07,
  MainPage08,
  MainPage09,
  MainPage10,
  MainPageHover01,
  MainPageHover02,
  MainPageHover03,
  MainPageHover04,
  MainPageHover05,
  MainPageHover06,
  MainPageHover07,
  MainPageHover08,
  MainPageHover09,
  MainPageHover10,
} from '../mainpage';

// 주소, basic svg, hover svg

function ProfileCard({ href, svg, hoverSvg }) {
  return (
    <div css={boxWrapper}>
      <a href='#' onClick={() => window.location.assign(href)}>
        <div css={createProfileBoxStyle(svg, hoverSvg)} />
      </a>
    </div>
  );
}

function MainPage() {
  const userSeqList = [3, 4];
  return (
    <PageWrapper>
      <NormalWrapper>
        <Header pageType='main' />
        <div css={boxListWrapper}>
          <div css={boxList}>
            <ProfileCard
              href='/4/normal'
              svg={MainPage01}
              hoverSvg={MainPageHover01}
            />
            <ProfileCard
              href='/4/normal'
              svg={MainPage02}
              hoverSvg={MainPageHover02}
            />
            <ProfileCard
              href='/5/normal'
              svg={MainPage03}
              hoverSvg={MainPageHover03}
            />
            <ProfileCard
              href='/5/normal'
              svg={MainPage04}
              hoverSvg={MainPageHover04}
            />
            <ProfileCard
              href='/5/normal'
              svg={MainPage06}
              hoverSvg={MainPageHover06}
            />
            <ProfileCard
              href='/5/normal'
              svg={MainPage07}
              hoverSvg={MainPageHover07}
            />
            <ProfileCard
              href='/5/normal'
              svg={MainPage08}
              hoverSvg={MainPageHover08}
            />
            <ProfileCard
              href='/5/normal'
              svg={MainPage09}
              hoverSvg={MainPageHover09}
            />
            <ProfileCard
              href='/5/normal'
              svg={MainPage10}
              hoverSvg={MainPageHover10}
            />
            <ProfileCard
              href='/5/normal'
              svg={MainPage05}
              hoverSvg={MainPageHover05}
            />
          </div>
        </div>
      </NormalWrapper>
    </PageWrapper>
  );
}

export default MainPage;

const boxListWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  ${'' /* background-color: yellow; */}
`;

const boxList = css`
  ${'' /* display: flex; */}
  text-align: flex-start;
  ${'' /* background-color: blue; */}
  ${'' /* min-width: 300px; */}
  margin: 0 0;
  width: 100%;
`;

const img01 = css``;

const boxWrapper = css`
  display: inline-block;
  width: 18%; /** 280 * 312 */
  margin: 1%;
  ${'' /* margin: 20px; */}
`;

function createProfileBoxStyle(svg, hoverSvg) {
  return css`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 111.4%;
    background-image: url('${svg}');
    background-size: contain;
    background-repeat: no-repeat;
    a:hover > & {
      background-image: url('${hoverSvg}');
    }
  `;
}

const profileBox = css`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  border-radius: 10px;
  background-color: red;
  a:hover > & {
    background-color: blue;
  }
`;
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
