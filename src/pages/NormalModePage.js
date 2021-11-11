import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import getWidgetsInfo from '../api/getWidgetsInfo';
import { createReplacementWidgetsAction } from '../redux/slice';

function NormalMode({ userMatch, pageUserId, pageUserName }) {
  console.log(`pageUserId:${pageUserId}`);
  console.log(`user match: ${userMatch}`);
  return (
    <PageWrapper>
      <NormalWrapper>
        <Header
          userMatch={userMatch}
          pageUserId={pageUserId}
          pageUserName={pageUserName}
        />
        <NormalModeGrid />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
