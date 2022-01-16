/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import QuestionList from '../components/QuestionBox/QuestionList';
import QuestionInputBox from '../components/QuestionBox/QuestionInputBox';

function QnaPage() {
  return (
    <div css={[pageBox, paddingBottom]}>
      <div css={contentsBox}>
        <h2 css={[paddingTop, header1, colorWhite]}>디자인이 궁금한 순간</h2>
        <p css={[header2, colorWhite]}>
          기다리고 기다리던 Q&A 영상이 올라왔어요.
          <br />
          지금 바로 아래 버튼을 눌러 확인해보세요.
        </p>
        <QuestionInputBox />
        <QuestionList />
      </div>
    </div>
  );
}

const pageBox = css`
  background-color: #e2e2e2;
  min-width: 665px;
`;

const paddingTop = css`
  padding-top: 300px;
`;

const paddingBottom = css`
  padding-bottom: 300px;
`;

const contentsBox = css`
  min-height: 100vh;
  max-width: 1000px;
  padding: 0 20px;
  margin: 0 auto;
`;

const colorWhite = css`
  color: #ef6408;
`;

const header1 = css`
  font-size: 50px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
`;

const header2 = css`
  margin-top: 20px;
  font-size: 22px;
  font-weight: 400;
  line-hiehgt: 1.5;
  text-align: center;
`;

export default QnaPage;
