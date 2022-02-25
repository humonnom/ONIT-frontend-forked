/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRequestAuth } from '../../hooks/useRequestAuth';
import { getApiEndpoint, isError, urlOwnerNotFound } from '../../utils/util';
import FeedbackListCol from './FeedbackListCol';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState(null);
  const [listDiv, setListdiv] = useState(<div />);
  const listDivOne = [];
  const listDivTwo = [];
  const listDivThree = [];

  // 데이터 받아오는 코드 추가 예정
  useEffect(() => {
    requestFeedbacks();
  }, []);

  const { res: feedbacksRes, request: requestFeedbacks } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/feedback`,
    method: 'get',
  });

  useEffect(() => {
    if (feedbacksRes && feedbacksRes.data) {
      const { code, data, message } = feedbacksRes.data;
      if (isError(code) && urlOwnerNotFound(message)) {
        alert('정보를 가져올 수 없습니다.');
      } else if (isError(code)) {
        alert('데이터 베이스 에러입니다.');
      }
      if (data) {
        setFeedbacks(data);
      }
    }
  }, [feedbacksRes]);

  useEffect(() => {
    if (feedbacks !== null) {
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
      if (listDivOne.length !== 0) {
        setListdiv(divideList());
      }
    }
  }, [feedbacks]);

  function divideList() {
    return [listDivOne, listDivTwo, listDivThree].map((list) => (
      <FeedbackListCol key={list[0].feedback_seq}>
        {list.map((Feedback) => (
          <li key={Feedback.feedback_seq} css={listItem}>
            <div css={[FeedbackBoxCss, randomColor()]}>
              <div css={orderWrapper}>
                <p css={orderFont}>{Feedback.feedback_seq}번째 바람</p>
              </div>
              <p css={contentsWrapper}>{Feedback.content}</p>
            </div>
          </li>
        ))}
      </FeedbackListCol>
    ));
  }

  return <div css={ContentBox}>{listDiv}</div>;
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
