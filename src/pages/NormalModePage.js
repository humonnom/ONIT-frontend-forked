import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import { getPageUser } from '../utils/parsing';
import getLoginState from './getLoginState';
import { useWidgetData } from '../hooks/useWidgetData';

import { convertForRedux } from '../utils/convert';
import { createReplacementWidgetsAction } from '../redux/slice';

function NormalMode() {
  const pageUserSeq = getPageUser();
  // TODO: get page user name
  const pageUserName = 'page user name';
  const userMatch = getLoginState();
  const { res } = useWidgetData(pageUserSeq, 'normal');
  const dispatch = useDispatch();

  const setWidgetState = (widget_data) => {
    const convertedForRedux = convertForRedux(widget_data);
    dispatch(
      createReplacementWidgetsAction({
        count: convertedForRedux.length,
        list: convertedForRedux,
      })
    );
  };

  useEffect(() => {
    console.log('res', res);
    if (res) {
      setWidgetState(res.data.widget_list);
    }
  }, [res]);

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
