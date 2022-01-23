/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FeedbackListCol from './FeedbackListCol';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function FeedbackList() {
  const listDivOne = [];
  const listDivTwo = [];
  const listDivThree = [];

  // fetch .. 데이터 받아오는 코드 추가 예정
  const feedbacks = [
    { order: 1, contents: '디자이너 조직 몇명인지~ 궁금해요~' },
    { order: 2, contents: '미니멀하기위한 원칙' },
    { order: 3, contents: 'heom님 너무 멋있어요' },
    { order: 4, contents: 'maaps팀 짱짱맨 최고' },
    { order: 5, contents: '51은 구디에서 저희 집까지 가는 버스 번호입니다.' },
    {
      order: 6,
      contents:
        '배가 고픈데 집에 아무것도 없어요. 내일은 그래서 양파를 볶아서 카레를 해먹어야겠다. 야채는 왜 빨리 썩어버리는 걸까? 잠깐만 한눈팔면 금방 시들해져서 또 해치워야함ㅠ',
    },
  ];

  shuffleArray(feedbacks);

  feedbacks.forEach((Feedback, index) => {
    if (index % 3 === 0) {
      listDivOne.push(feedbacks[index]);
    } else if (index % 3 === 1) {
      listDivTwo.push(feedbacks[index]);
    } else {
      listDivThree.push(feedbacks[index]);
    }
  });

  return (
    <div css={ContentBox}>
      {[listDivOne, listDivTwo, listDivThree].map((list) => (
        <FeedbackListCol key={list[1].order}>
          {list.map((Feedback) => (
            <li key={Feedback.order} css={listItem}>
              <div css={[FeedbackBoxCss, randomColor()]}>
                <div css={orderWrapper}>
                  <p css={orderFont}>{Feedback.order}번째 바람</p>
                </div>
                <p css={contentsWrapper}>{Feedback.contents}</p>
              </div>
            </li>
          ))}
        </FeedbackListCol>
      ))}
    </div>
  );
}

const blueColor = css`
  background-color: #507fe9;
  color: black;
`;
const yellowColor = css`
  background-color: #ffd376;
  color: black;
`;
const blackColor = css`
  background-color: #2e2e2e;
  color: white;
`;
const orangeColor = css`
  background-color: #ed754a;
  color: black;
`;
const greenColor = css`
  background-color: #84bfa4;
  color: black;
`;

const colors = [blueColor, yellowColor, blackColor, orangeColor, greenColor];

let prevColorIndex = null;

function randomColor() {
  let index = prevColorIndex;
  while (index === prevColorIndex) {
    index = Math.floor(Math.random() * 5);
  }
  prevColorIndex = index;
  return colors[index];
}

const ContentBox = css`
  width: 100%;
  margin: 0 0 -20px;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  box-sizing: border-box;
`;

const listItem = css`
  opacity: 1;
  transform: translate3d(0px, 0px, 0px);
  padding-bottom: 20px;
`;

const FeedbackBoxCss = css`
  padding: 17px 20px;
  word-break: break-all;
  border-bottom-right-radius: 50px;
`;

const orderWrapper = css`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 20px;
  margin-bottom: 10px;
`;

const orderFont = css`
  display: inline-block;
  padding: 0px;
  margin: 0px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.6px;
`;

const contentsWrapper = css`
  display: block;
  margin: 11px 0px 0px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
`;

export default FeedbackList;
