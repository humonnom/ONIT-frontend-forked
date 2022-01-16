/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function QuestionListCol(props) {
  return (
    <div css={listBox}>
      <ul css={AbsolUlCss} />
      <ul css={ulCss}>{props.children}</ul>
    </div>
  );
}

const listBox = css`
  position: relative;
  display: inline-block;
  flex-grow: 1;
  flex-basis: calc(33.3333% - 20px);
`;

const AbsolUlCss = css`
  position: absolute;
  top: 20px;
  right: 20px;
  left: 20px;
  padding: 0px;
  margin: 0px;
`;

const ulCss = css`
  box-sizing: border-box;
  margin: 0px;
  list-style: none;
`;

export default QuestionListCol;
