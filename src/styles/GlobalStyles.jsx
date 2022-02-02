import { css } from '@emotion/react';

export const COLOR_STYLE = {
  primary: '#efd9c1',
  white: '#ffffff',
  black: '#000000',
  grey: 'grey',
  lightGrey: '#f8f8f8',
  redOrange: '#f00',
  orange: '#ef6408',
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
