import React, { useEffect, useMemo, useState } from 'react';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import { getApiEndpoint, isError, urlOwnerNotFound } from '../utils/util';
import { useRequestAuth } from '../hooks/useRequestAuth';
import useSaveWidgetData from '../hooks/useSaveWidgetData';
import { useGetUrl } from '../hooks/util';

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
      if (isError(code) && urlOwnerNotFound(message)) {
        alert('페이지를 찾을 수 없습니다.');
      } else if (isError(code)) {
        alert('데이터 베이스 에레입니다.');
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
