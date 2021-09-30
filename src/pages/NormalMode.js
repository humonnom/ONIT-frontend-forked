import React from 'react';
import { NormalWrapper, AllWidgets, PageWrapper, Header } from '../components';

function NormalMode(props) {
  return (
    <PageWrapper>
      <NormalWrapper>
        <Header />
        <AllWidgets />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
