/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function LoadingMessageStyle(props) {
  return <div css={style}>{props.children}</div>;
}

export const style = css`
  color: #cccccc;
  margin-top: 35px;
  font-size: 14px;
  font-weight: bold;
  font-family: NotoSansCJKKR;
`;

export default LoadingMessageStyle;
