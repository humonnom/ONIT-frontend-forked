import { useEffect, useState } from 'react';
import { NormalModePage } from '.';
import { breakpoints } from '../styles/GlobalStyles';

function NormalSplashPage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    if (width) {
      if (width < breakpoints[0]) {
        setMobileMode(true);
      }
    }
    return () => setMobileMode(false);
  }, [width]);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });
  return (
    <>
      {mobileMode && <div>mobile</div>}
      {!mobileMode && <NormalModePage />}
    </>
  );
}

export default NormalSplashPage;
