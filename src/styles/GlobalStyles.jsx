import { css } from '@emotion/react';
import facepaint from 'facepaint';

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

export const TextUnderline = css`
  text-decoration: underline;
`;

export const SHADOW_STYLE = {
  pale: ' 3px 0px 20px -5px rgba(0, 0, 0, 0.09)',
};

export const FONT_SIZE = {
  xs: '1rem',
  s: '1.5rem',
  m: '2.0rem',
  l: '2.5rem',
  xl: '3rem',
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

// media query

const breakpoints = [576, 768, 992, 1200];

export const mq = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp}px)`)
);

export const PageTitleMQ = () => {
  return mq({
    fontSize: [FONT_SIZE.s, FONT_SIZE.s, FONT_SIZE.m, FONT_SIZE.l],
  });
};

export const BackButton = css`
  ${InitButtonStyle}
  font-size: 1.2rem;
  color: ${COLOR_STYLE.brownishGrey};
  margin-bottom: 3vh;
  font-weight: bold;
`;
