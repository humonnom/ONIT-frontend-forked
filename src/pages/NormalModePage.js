import React, { useEffect, useState } from 'react';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import getWidgetsInfo from '../api/getWidgetsInfo';
import { createReplacementWidgetsAction } from '../redux/slice';

function NormalMode(props) {
  return (
    <PageWrapper>
      <NormalWrapper>
        <Header />
        <NormalModeGrid />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
