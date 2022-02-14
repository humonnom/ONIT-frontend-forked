import React, { useEffect, useMemo, useState } from 'react';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import { getApiEndpoint, isError, isNotFound } from '../utils/util';
import { useRequestAuth } from '../hooks/useRequestAuth';
import useSaveWidgetData from '../hooks/useSaveWidgetData';
import { useGetUrl } from '../hooks/useUtil';

function NormalMode() {
  const pageUrl = useGetUrl();
  const [userSeq, setUserSeq] = useState(null);

  const { res: pageUserRes, request: requestPageUserInfo } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });

  useEffect(() => {
    requestPageUserInfo();
  }, [pageUrl]);

  const pageInfo = useMemo(() => {
    if (pageUserRes && pageUserRes.data) {
      const { code, data, message } = pageUserRes.data;
      if (isNotFound(code, message)) {
        alert('page user not found');
      } else if (isError(code)) {
        alert('db error');
      }
      if (data) {
        setUserSeq(data.user_seq);
        return data;
      }
    }
    return null;
  }, [pageUserRes]);

  const { res: widgetRes, request: requestWidgetData } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/user/${userSeq}/widgets`,
    method: 'get',
  });

  useEffect(() => {
    if (userSeq) {
      requestWidgetData();
    }
  }, [userSeq, requestWidgetData]);

  const { save: saveWidgetData } = useSaveWidgetData();

  useEffect(() => {
    if (widgetRes) {
      saveWidgetData(widgetRes.data.widget_list);
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
