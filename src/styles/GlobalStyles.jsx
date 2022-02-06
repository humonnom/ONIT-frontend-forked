import { css } from '@emotion/react';

export const COLOR_STYLE = {
  orange: '#ef6408',
  veryLightPink: '#f2f2f2',
  paleGrey: '#f5f7f8',
  brownishGrey: '#707070',
  black: '#000000',
  lightGrey: '#f8f8f8',
  white: '#ffffff',
  coral: '#ff4545',
};

export const SHADOW_STYLE = {
  pale: ' 3px 0px 20px -5px rgba(0, 0, 0, 0.09)',
};

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColCenter = css`
  ${FlexCenter}
  flex-direction: column;
  justify-content: center;
`;

export const FlexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

export const FlexColSpaceBetween = css`
  ${FlexSpaceBetween};
  flex-direction: column;
`;

export const FlexSpaceBetweenCenter = css`
  ${FlexSpaceBetween};
  align-items: center;
`;
export const FlexSpaceBetweenStart = css`
  ${FlexSpaceBetween};
  align-items: start;
`;

export const FlexColSpaceBetweenCenter = css`
  ${FlexColSpaceBetween};
  align-items: center;
`;

export const FlexColSpaceBetweenEnd = css`
  ${FlexColSpaceBetween};
  align-items: end;
`;
export const FlexColSpaceBetweenStart = css`
  ${FlexColSpaceBetween};
  align-items: start;
`;

export const FlexSpaceAround = css`
  display: flex;
  justify-content: space-around;
`;

export const FlexSpaceAroundStart = css`
  ${FlexSpaceAround}
  align-items: start;
`;
export const FlexSpaceAroundCenter = css`
  ${FlexSpaceAround}
  align-items: center;
`;

export const FlexColSpaceAround = css`
  ${FlexSpaceAround}
  flex-direction: column;
`;

export const FlexColSpaceAroundCenter = css`
  ${FlexColSpaceAround}
  align-items: center;
`;

export const FlexColSpaceAroundStart = css`
  ${FlexColSpaceAround}
  align-items: start;
`;

// display
export const DisplayNone = css`
  display: none;
`;

export const DisplayUnset = css`
  display: unset;
`;

export const InitButtonStyle = css`
  padding: 0;
  border: 0;
  outline: 0;
  background-color: inherit;
  word-break: keep-all;
`;
