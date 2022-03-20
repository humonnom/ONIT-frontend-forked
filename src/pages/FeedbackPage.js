/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FeedbackList from '../components/FeedbackBox/FeedbackList';
import FeedbackInputBox from '../components/FeedbackBox/FeedbackInputBox';
import MainSentence from '../components/FeedbackBox/MainSentence';
import { Header } from '../components';

function FeedbackPage() {
  return (
    <div css={[pageBox, paddingBottom]}>
      <Header pageType='feedback' />
      <div css={contentsBox}>
        <MainSentence />
        <FeedbackInputBox />
        <FeedbackList />
      </div>
    </div>
  );
}

const pageBox = css`
  background-color: #f2f2f2;
  min-width: 1124px;
`;

const paddingBottom = css`
  padding-bottom: 300px;
`;

const contentsBox = css`
  position: relative;
  top: 81px;
  min-height: 100vh;
  max-width: 1000px;
  padding: 0 20px;
  margin: 0 auto;
`;

export default FeedbackPage;
