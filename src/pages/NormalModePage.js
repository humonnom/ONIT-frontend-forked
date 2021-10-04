import React, { useState } from 'react';
import { NormalWrapper, AllWidgets, PageWrapper, Header } from '../components';

function NormalMode(props) {
  const [layoutInfo, setLayoutInfo] = useState([
    {
      i: '0',
      x: 1,
      y: 1,
      w: 2,
      h: 2,
      type: 'txt',
      source: '블록을 추가하세요!',
    },
  ]);

  return (
    <PageWrapper>
      <NormalWrapper>
        <Header />
        <AllWidgets layoutInfo={layoutInfo} />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
