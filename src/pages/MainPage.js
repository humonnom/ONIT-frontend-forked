/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Header, NormalWrapper, PageWrapper } from '../components';
// 주소, basic svg, hover svg

function MainPage() {
  return (
    <PageWrapper>
      <NormalWrapper>
        <Header pageType='main' />
        <div css={boxListWrapper}>
          <div css={boxList} />
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
