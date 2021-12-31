import React from 'react';

import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';

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
          pageType='normal'
        />
        <NormalModeGrid />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
