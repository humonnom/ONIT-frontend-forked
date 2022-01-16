/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import QuestionListCol from './QuestionListCol';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function QuestionList() {
  const listDivOne = [];
  const listDivTwo = [];
  const listDivThree = [];

  // fetch .. 데이터 받아오는 코드 추가 예정
  const questions = [
    { order: 1, contents: '디자이너 조직 몇명인지~ 궁금해요~' },
    { order: 2, contents: '미니멀하기위한 원칙' },
    { order: 3, contents: 'heom님 너무 멋있어요' },
    { order: 4, contents: 'maaps팀 짱짱맨 최고' },
    { order: 5, contents: '51은 구디에서 저희 집까지 가는 버스 번호입니다.' },
    { order: 6, contents: '이것은 샘플 코드입니다. 태호킴이 손 봐줄겁니다.' },
  ];

  shuffleArray(questions);

  questions.forEach((question, index) => {
    if (index % 3 === 0) {
      listDivOne.push(questions[index]);
    } else if (index % 3 === 1) {
      listDivTwo.push(questions[index]);
    } else {
      listDivThree.push(questions[index]);
    }
  });

  return (
    <div css={ContentBox}>
      {[listDivOne, listDivTwo, listDivThree].map((list) => (
        <QuestionListCol key={list[1].order}>
          {list.map((question) => (
            <li key={question.order} css={listItem}>
              <div css={[QuestionBoxCss, randomColor()]}>
                <div css={orderWrapper}>
                  <p css={orderFont}>{question.order}번째 궁금함</p>
                </div>
                <p css={contentsWrapper}>{question.contents}</p>
              </div>
            </li>
          ))}
        </QuestionListCol>
      ))}
    </div>
  );
}

const blueColor = css`
  background-color: rgb(0, 132, 255);
`;
const yellowColor = css`
  background-color: rgb(255, 199, 43);
`;
const pinkColor = css`
  background-color: rgb(255, 158, 148);
`;
const orangeColor = css`
  background-color: rgb(254, 131, 58);
`;
const greenColor = css`
  background-color: rgb(0, 160, 78);
`;

const colors = [blueColor, yellowColor, pinkColor, orangeColor, greenColor];

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

const QuestionBoxCss = css`
  padding: 17px 20px;
  word-break: break-all;
  border-radius: 10px;
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
  color: rgba(0, 0, 0, 0.5);
`;

const contentsWrapper = css`
  display: block;
  margin: 11px 0px 0px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: rgb(0, 0, 0);
`;

export default QuestionList;
