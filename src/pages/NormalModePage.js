import React, { useEffect, useMemo, useState } from 'react';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import { getPageUrl, getApiEndpoint } from '../utils/util';
import { useWidgetData } from '../hooks/useWidgetData';
import { useRequestAuth } from '../hooks/useRequestAuth';
import useSaveWidgetData from '../hooks/useSaveWidgetData';

function NormalMode() {
  const pageUrl = getPageUrl();
  const [widgetData, setWidgetData] = useState([]);
  const [userSeq, setUserSeq] = useState(null);

  const { res: pageUserRes, request: pageUserRequest } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });

  useEffect(() => {
    pageUserRequest();
  }, []);

  const pageInfo = useMemo(() => {
    if (pageUserRes && pageUserRes.data) {
      const { code, data, message } = pageUserRes.data;
      if (code === 'error' && message === 'no user information') {
        alert('page user not found');
      } else if (code === 'error') {
        alert('db error');
      }
      if (data) {
        setUserSeq(data.user_seq);
        return data;
      }
    }
    return null;
  }, [pageUserRes]);

  const { res: widgetRes, request: widgetRequest } = useWidgetData({
    userSeq,
    dest: 'normal',
  });

  useEffect(() => {
    if (userSeq) {
      widgetRequest();
    }
  }, [userSeq, widgetRequest]);

  const { save: saveWidgetData } = useSaveWidgetData({
    widgetData,
  });

  useEffect(() => {
    if (widgetRes) {
      setWidgetData(widgetRes.data.widget_list);
      saveWidgetData();
    }
  }, [widgetRes]);

  return (
    <PageWrapper>
      <NormalWrapper>
        {pageInfo && (
          <Header
            userMatch={pageInfo.user_matched}
            pageUrl={pageUrl}
            pageUserName={pageInfo.nickname}
            pageType='normal'
          />
        )}
        <NormalModeGrid />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
