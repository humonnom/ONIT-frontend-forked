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
  // OwnWeb,
} from '../../asset/index';

function MainContents() {
  return (
    <>
      <div css={[containerBox, marginLeft]}>
        <div css={[upArrow, moveUpArrowRotate]}>
          <img width='100%' src={mainPageUpArrow} />
        </div>
        <div css={[fontBlockBox, buildBox]}>
          <img width='100%' src={BlackBuild} />
        </div>
        <div css={[fontBlockBox, yourBox]}>
          <img width='100%' src={BlackYour} />
        </div>
        <div css={[fontBlockBox, animationBoxwidth]}>
          <div css={[bottomInnerBox]}>
            <div css={[letterBlock, letterO, moveLeftO]}>
              <img src={OrangeO} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img src={BlackW} />
            </div>
            <div css={[letterBlock, moveLeftN]}>
              <img src={OrangeN} />
            </div>
            <div css={[letterspace]} />
            <div css={[letterBlock, disapppear]}>
              <img src={BlackW} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img src={BlackE} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img src={BlackB} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img src={BlackS} />
            </div>
            <div css={[letterBlock, moveLeftIT]}>
              <img src={OrangeI} />
            </div>
            <div css={[letterBlock, moveLeftIT]}>
              <img src={OrangeT} />
            </div>
            <div css={[letterBlock, disapppear]}>
              <img src={BlackE} />
            </div>
          </div>
        </div>
        <div css={[downArrow, moveDownArrowRotate]}>
          <img src={mainPageDownArrow} />
        </div>
      </div>
    </>
  );
}

const containerBox = css`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 180px auto;
  min-width: 1124px;
  flex-direction: column;
  box-sizing: border-box;
`;

const buildBox = css`
  width: 30%;
`;

const yourBox = css`
  width: 29.1621%;
  margin-left: 28%;
`;

const animationBoxwidth = css`
  position: relative;
  width: 73.2%;
  margin: -1px 0 0% 6.5%;
  padding-top: 0;
  padding-bottom: 9.1%;
  height: 0;
`;

// border: 1px solid;
const fontBlockBox = css`
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
  padding-right: 6%;
`;

const bottomInnerBox = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 1% 1.4%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const letterBlock = css`
  position: relative;
  height: 100%;
  margin: 0.5%;
  img {
    height: 100%;
  }
`;

const letterO = css`
  margin-right: -0.5%;
`;

const letterspace = css`
  width: 3%;
`;

const downArrow = css`
  position: absolute;
  bottom: -15%;
  right: 6%;
  width: 11.7%;
  img {
    width: 100%;
    margin: 8%;
  }
`;

// animation
const upArrowRotate = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  10% {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  20% {
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(90deg);
  }

  40% {
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
`;

const downArrowRotate = keyframes`
0% {
  -webkit-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}
10% {
  -webkit-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}

20% {
  -webkit-transform: rotate(180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(180deg);
}

40% {
  -webkit-transform: rotate(180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(180deg);
}

50% {
  -webkit-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}

100% {
  -webkit-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}
`;

const disapppearAnimation = keyframes`
  0 {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const moveAnimationO = keyframes`
  0% {
    left: 0%;
  }

  10% {
    left: 0%;
  }

  20% {
    left: 67.6%;
  }

  40% {
    left: 67.6%;
  }

  50% {
    left: 0%;
  }

  100% {
    left: 0%;
  }
`;

const moveAnimationN = keyframes`
  0% {
    left: 0%;
  }

  10% {
    left: 0%;
  }

  20% {
    left: 53.4%;
  }

  40% {
    left: 53.4%;
  }

  50% {
    left: 0%;
  }

  100% {
    left: 0%;
  }
`;

const moveAnimationIT = keyframes`
  0% {
    left: 0%;
  }

  10% {
    left: 0%;
  }

  20% {
    left: 9%;
  }

  40% {
    left: 9%;
  }

  50% {
    left: 0%;
  }

  100% {
    left: 0%;
  }
`;

const moveUpArrowRotate = css`
  animation-name: ${upArrowRotate};
  animation-delay: 1.5s;
  animation-duration: 5s;
  transition-timing-function: ease-in-out;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
`;

const moveDownArrowRotate = css`
  animation-name: ${downArrowRotate};
  animation-delay: 1.5s;
  animation-duration: 5s;
  transition-timing-function: ease-in-out;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
`;

const disapppear = css`
  animation-name: ${disapppearAnimation};
  animation-delay: 1.5s;
  animation-duration: 5s;
  transition-timing-function: ease-in-out;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
`;

const moveLeftO = css`
  animation-name: ${moveAnimationO};
  animation-delay: 1.5s;
  animation-duration: 5s;
  transition-timing-function: ease-in-out;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
`;

const moveLeftN = css`
  animation-name: ${moveAnimationN};
  animation-delay: 1.5s;
  animation-duration: 5s;
  transition-timing-function: ease-in-out;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
`;

const moveLeftIT = css`
  animation-name: ${moveAnimationIT};
  animation-delay: 1.5s;
  animation-duration: 5s;
  transition-timing-function: ease-in-out;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
`;

export default MainContents;
