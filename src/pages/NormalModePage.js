import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import { getPageUser } from '../utils/parsing';
import { getLoginState, getApiEndpoint } from '../utils/util';
import { useWidgetData } from '../hooks/useWidgetData';

import { convertForRedux } from '../utils/convert';
import { createReplacementWidgetsAction } from '../redux/slice';
import { useRequestAuth } from '../hooks/useRequestAuth';

function NormalMode() {
  const pageUserSeq = getPageUser();
  const userMatch = getLoginState();
  const { res } = useWidgetData(pageUserSeq, 'normal');
  const endpoint = `${getApiEndpoint()}/me`;

  const { res: userRes, request } = useRequestAuth({
    endpoint,
    method: 'get',
  });
  const dispatch = useDispatch();
  const [pageUserName, setPageUserName] = useState('');
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
    request();
  }, []);

  const userInfo = useMemo(() => {
    console.log('!!!!!!user res');
    console.log(userRes);
    if (userRes && userRes.data) return userRes.data.data;
    return null;
  }, [userRes]);

  console.log('userInfo');
  console.log(userInfo);

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
