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
    {
      order: 7,
      contents:
        '한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다.',
    },
    {
      order: 8,
      contents:
        '타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이 정하는 바에 의하여 국가로부터 구조를 받을 수 있다. 국회의 회의는 공개한다. 다만, 출석의원 과반수의 찬성이 있거나 의장이 국가의 안전보장을 위하여 필요하다고 인정할 때에는 공개하지 아니할 수 있다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.',
    },
    {
      order: 9,
      contents:
        '대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 모든 국민은 신체의 자유를 가진다. 누구든지 법률에 의하지 아니하고는 체포·구속·압수·수색 또는 심문을 받지 아니하며, 법률과 적법한 절차에 의하지 아니하고는 처벌·보안처분 또는 강제노역을 받지 아니한다. 국방상 또는 국민경제상 긴절한 필요로 인하여 법률이 정하는 경우를 제외하고는, 사영기업을 국유 또는 공유로 이전하거나 그 경영을 통제 또는 관리할 수 없다. 대한민국은 민주공화국이다.',
    },
    {
      order: 10,
      contents:
        '제1항의 지시를 받은 당해 행정기관은 이에 응하여야 한다. 이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다. 대통령은 국가의 독립·영토의 보전·국가의 계속성과 헌법을 수호할 책무를 진다.',
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
  border-bottom-right-radius: 40px;
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