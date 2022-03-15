/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import {
  mainPageUpArrow,
  mainPageDownArrow,
  BlackBuild,
  BlackYour,
  BlackB,
  BlackE,
  BlackS,
  BlackW,
  OrangeI,
  OrangeN,
  OrangeO,
  OrangeT,
} from '../../asset/index';

function MainContents() {
  return (
    <>
      <div css={[containerBox]}>
        <div css={[upArrow, marginLeft]}>
          <img height='100%' src={mainPageUpArrow} />
        </div>
        <div css={marginLeft}>
          <div css={[fontBlockBox]}>
            <img height='100%' src={BlackBuild} />
          </div>
          <div css={[middleBox, fontBlockBox]}>
            <img height='100%' src={BlackYour} />
          </div>
          <div css={[flexRow]}>
            <div css={[bottomBox, fontBlockBox]}>
              <div css={[letterBlock, moveLeft]}>
                <img height='100%' src={OrangeO} />
              </div>
              <div css={[letterBlock, disapppear]}>
                <img height='100%' src={BlackW} />
              </div>
              <div css={[letterBlock, moveLeft]}>
                <img height='100%' src={OrangeN} />
              </div>
              <div css={[letterBlock, disapppear]}>
                <img height='100%' src={BlackW} />
                <img height='100%' src={BlackE} />
                <img height='100%' src={BlackB} />
                <img height='100%' src={BlackS} />
              </div>
              <div css={[letterBlock, moveLeft]}>
                <img height='100%' src={OrangeI} />
                <img height='100%' src={OrangeT} />
              </div>
              <div css={[letterBlock, disapppear]}>
                <img height='100%' src={BlackE} />
              </div>
            </div>
            <div>
              <img height='100%' src={mainPageDownArrow} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const containerBox = css`
  display: flex;
  width: 90%;
  min-width: 1124px;
  flex-direction: column;
  padding-top: 180px;
  box-sizing: border-box;
`;

const fontBlockBox = css`
  height: 7rem;
  width: fit-content;
  border: 1px solid;
  border-collapse: collapse;
  padding: 15px 30px;
  margin-top: -1px;
`;

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

const upArrow = css`
  padding-bottom: 1%;
`;

const marginLeft = css`
  padding-left: 6%;
`;

const middleBox = css`
  margin-left: 390px;
`;

const bottomBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 3.5rem;
  margin-left: 100px;
`;

const letterBlock = css`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    padding: 5px;
  }
`;

// 애니메이션
// const disapppearAnimation = keyframes`
//   0 {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0;
//   }
// `;

// animation: ${disapppearAnimation} 1s ease-in-out;
// animation-fill-mode: both;
// animation-iteration-count: 1;

const disapppear = css``;

const moveAnimation = keyframes`
  0% {

  }

  100% {
  }
`;

const moveLeft = css`
  position: relative;
  animation: ${moveAnimation} 1s ease;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 0.5s;
`;

export default MainContents;
