/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const popButtonsWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin: 0 30px;
  button {
    display: block;
    height: 35px;
    width: 130px;
    border-radius: 24px;
    border: none;
    background-color: #fff;
    color: #bbb;
    font-size: 15px;
    margin: 0 10px;
    padding: 0px;
    &:hover {
      background-color: #ef6408;
      color: #fff;
    }
    transition: 0.2s;
  }
`;
