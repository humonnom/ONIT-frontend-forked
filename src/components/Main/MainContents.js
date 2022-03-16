/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  mainPageUpArrow,
  mainPageDownArrow,
  BlackBuild,
  BlackYour,
  // BlackB,
  // BlackE,
  // BlackS,
  // BlackW,
  // OrangeI,
  // OrangeN,
  // OrangeO,
  // OrangeT,
  OwnWeb,
} from '../../asset/index';

function MainContents() {
  return (
    <>
      <div css={[containerBox, marginLeft]}>
        <div css={[upArrow]}>
          <img width='100%' src={mainPageUpArrow} />
        </div>
        <div css={[fontBlockBox, staticBoxwidth]}>
          <img width='100%' src={BlackBuild} />
        </div>
        <div css={[middleBox, fontBlockBox, staticBoxwidth]}>
          <img width='100%' src={BlackYour} />
        </div>
        <div css={[bottomBox, fontBlockBox, animationBoxwidth]}>
          <img width='100%' src={OwnWeb} />
          {/* <div css={[letterBlock, moveLeft]}>
            <img width='100%' src={OrangeO} />
          </div>
          <div css={[letterBlock, disapppear]}>
            <img width='100%' src={BlackW} />
          </div>
          <div css={[letterBlock, moveLeft]}>
            <img width='100%' src={OrangeN} />
          </div>
          <div css={[letterBlock, disapppear]}>
            <img width='100%' src={BlackW} />
          </div>
          <div css={[letterBlock, disapppear]}>
            <img width='100%' src={BlackE} />
          </div>
          <div css={[letterBlock, disapppear]}>
            <img width='100%' src={BlackB} />
          </div>
          <div css={[letterBlock, disapppear]}>
            <img width='100%' src={BlackS} />
          </div>
          <div css={[letterBlock, moveLeft]}>
            <img width='100%' src={OrangeI} />
          </div>
          <div css={[letterBlock, moveLeft]}>
            <img width='100%' src={OrangeT} />
          </div>
          <div css={[letterBlock, disapppear]}>
            <img width='100%' src={BlackE} />
          </div> */}
          <div css={[downArrow]}>
            <img width='100%' src={mainPageDownArrow} />
          </div>
        </div>
      </div>
    </>
  );
}

const containerBox = css`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 1124px;
  flex-direction: column;
  padding-top: 180px;
  box-sizing: border-box;
`;

const staticBoxwidth = css`
  width: 30.5%;
`;

const animationBoxwidth = css`
  width: 71.2%;
`;

const fontBlockBox = css`
  border: 1px solid;
  padding: 0.7% 1.4%;
  margin-top: -1px;
  img {
    display: block;
    margin: auto;
  }
`;

const upArrow = css`
  width: 7%;
  padding-bottom: 1%;
`;

const marginLeft = css`
  padding-left: 6%;
`;

const middleBox = css`
  margin-left: 28%;
`;

const bottomBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 9.5%;
`;

// const letterBlock = css`
// position: 'absolute',
// top: 0,
// left: 0,
// width: '100%',
//   height: 100%;
//   img {
//     padding: 5px;
//   }
// `;

const downArrow = css`
  position: absolute;
  right: 0px;
  padding: 6%;
  width: 11.7%;
  img {
    margin: 8%;
  }
`;

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
// const disapppear = css``;

// const moveAnimation = keyframes`
//   0% {

//   }

//   100% {
//   }
// `;

// const moveLeft = css`
//   animation: ${moveAnimation} 1s ease;
//   animation-fill-mode: both;
//   animation-iteration-count: 1;
//   animation-delay: 0.5s;
// `;

export default MainContents;
