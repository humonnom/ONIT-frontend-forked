import React, { useEffect, useState } from 'react';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import getWidgetsInfo from '../api/getWidgetsInfo';
import { createReplacementWidgetsAction } from '../redux/slice';

function NormalMode({ userMatch }) {
  // console.log(userMatch);
  return (
    <PageWrapper>
      <NormalWrapper>
        <Header userMatch={userMatch} />
        <NormalModeGrid />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
