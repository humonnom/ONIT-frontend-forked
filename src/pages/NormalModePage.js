import React, { useEffect, useState } from 'react';
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
  const userMatch = getLoginState();
  const { res } = useWidgetData(pageUserSeq, 'normal');
  const dispatch = useDispatch();
  const [pageUserName, setPageUserName] = useState('noname');
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
    if (res && res.data && res.data.widget_list) {
      console.log(res);
      setPageUserName(res.data.user_name);
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
