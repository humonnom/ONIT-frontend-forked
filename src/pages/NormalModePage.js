import React, { useState } from 'react';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import { getPageUser } from '../utils/parsing';
import getLoginState from './getLoginState';
import renderData from './renderData';

function NormalMode() {
  const [renderState, setRenderState] = useState(false);
  const pageUserSeq = getPageUser();
  console.log('========');
  console.log(pageUserSeq);
  // TODO: get page user name
  const pageUserName = 'page user name';
  const userMatch = getLoginState();

  if (renderState === false) {
    renderData(pageUserSeq, 'normal');
    setRenderState(true);
  }

  return (
    <PageWrapper>
      <NormalWrapper>
        <Header
          userMatch={userMatch}
          pageUserId={pageUserSeq}
          pageUserName={pageUserName}
          pageType='normal'
        />
        <NormalModeGrid />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
