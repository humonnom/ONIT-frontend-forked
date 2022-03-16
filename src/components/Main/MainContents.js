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
      <div css={[containerBox, marginLeft]}>
        <div css={[upArrow, removerotate]}>
          <img height='100%' src={mainPageUpArrow} />
        </div>
        <div css={[fontBlockBox, boxHeight]}>
          <img height='95px' src={BlackBuild} />
        </div>
        <div css={[middleBox, fontBlockBox, boxHeight]}>
          <img height='95px' src={BlackYour} />
        </div>
        <div>
          {/* <div css={[bottomBoxBorder, moveBorderLeft]} /> */}
          <div css={[bottomBox, fontBlockBox, boxHeight]}>
            <div css={[OletterBlock, moveOLeft]}>
              <img height='95px' src={OrangeO} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img height='95px' src={BlackW} />
            </div>
            <div css={[letterBlock, moveNLeft]}>
              <img height='95px' src={OrangeN} />
            </div>
            <div css={[space]} />
            <div css={[letterBlock, disapppear]}>
              <img height='95px' src={BlackW} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img height='95px' src={BlackE} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img height='95px' src={BlackB} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img height='95px' src={BlackS} />
            </div>
            <div css={[letterBlock, moveITLeft]}>
              <img height='95px' src={OrangeI} />
            </div>
            <div css={[letterBlock, moveITLeft]}>
              <img height='95px' src={OrangeT} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img height='95px' src={BlackE} />
            </div>
          </div>
        </div>
        <div css={[downArrow, moverotate]}>
          <img height='100%' src={mainPageDownArrow} />
        </div>
      </div>
    </>
  );
}

const containerBox = css`
  display: flex;
  height: 100%;
  min-width: 1124px;
  flex-direction: column;
  padding-top: 180px;
`;

const boxHeight = css`
  height: 95px;
`;

const fontBlockBox = css`
  width: fit-content;
  padding: 7.5px 15px;
  margin-top: -1px;
  img {
    display: block;
  }
`;

const space = css`
  width: 40px;
`;

const upArrow = css`
  height: 100px;
  width: 100px;
  margin-bottom: 40px;
`;

const marginLeft = css`
  margin-left: 86px;
`;

const middleBox = css`
  margin-left: 297px;
`;

// const bottomBoxBorder = css`
//   position: absolute;
//   width: 872.79px;
//   height: 110px;
//   border: 1px solid;
// `;

const bottomBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 98px;
`;

const OletterBlock = css`
  height: 100%;
  margin-right: -5px;
`;

const letterBlock = css`
  height: 100%;
  img {
    padding: 0 5px;
  }
`;

const downArrow = css`
  position: relative;
  left: 1100px;
  top: -70px;
  height: 140px;
  width: 140px;
`;

// 애니메이션
const disapppearAnimation = keyframes`
  0 {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const disapppear = css`
  animation: ${disapppearAnimation} 1s ease-in-out;
  animation-fill-mode: both;
  animation-iteration-count: 1;
`;

const moveOAnimation = keyframes`
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(630px);
  }
`;

const moveOLeft = css`
  animation: ${moveOAnimation} 1s ease;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 0.5s;
`;

const moveNAnimation = keyframes`
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(503px);
  }
`;

const moveNLeft = css`
  animation: ${moveNAnimation} 1s ease;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 0.5s;
`;

const moveITAnimation = keyframes`
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(83.55px);
  }
`;

const moveITLeft = css`
  animation: ${moveITAnimation} 1s ease;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 0.5s;
`;

// const moveBorderAnimation = keyframes`
//   0% {
//     margin-left: 98px;
//     width: 872.79px
//   }

//   100% {
//     margin-left: 735.79px;
//     width: 325px;
//   }
// `;

// const moveBorderLeft = css`
//   animation: ${moveBorderAnimation} 1s ease;
//   animation-fill-mode: both;
//   animation-iteration-count: 1;
//   animation-delay: 0.5s;
// `;

const rotate = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
`;

const moverotate = css`
  animation: ${rotate} 1s ease;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 0.5s;
`;

const rerotate = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(90deg);
  }
`;

const removerotate = css`
  animation: ${rerotate} 1s ease;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 0.5s;
`;

export default MainContents;
