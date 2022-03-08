import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { HEADER_HEIGHT } from '../../styles/style';

function headerWrapper({ children }) {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // clean up
    };
  }, []);

  const handleScroll = () => {
    setLeft(left - window.scrollX);
  };

  return (
    <div
      className={css`
        position: fixed;
        top: 30px;
        left: ${left}px;
        z-index: 999;
        background-color: white;
        min-width: 1124px;
        width: 90%;
        height: ${HEADER_HEIGHT};
        flex-direction: row;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
        padding: 0;
        margin: 0 5%;
        border-radius: 30px;
      `}
    >
      {children}
    </div>
  );
}

export default headerWrapper;
