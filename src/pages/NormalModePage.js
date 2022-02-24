import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import {
  getApiEndpoint,
  isError,
  urlOwnerNotFound,
  urlMatched,
} from '../utils/util';
import { useRequestAuth } from '../hooks/useRequestAuth';
import { useGetUrl } from '../hooks/util';
import { useMyInfo } from '../hooks/myInfo';
import { useSaveWidget } from '../hooks/widget';

function NormalMode() {
  const pageUrl = useGetUrl();
  const [userSeq, setUserSeq] = useState(null);
  const [userMatched, setUserMatched] = useState(null);
  const [nickname, setNickname] = useState(null);
  const history = useHistory();
  const { myInfo } = useMyInfo();
  const { res: pageUserRes, request: requestPageUserInfo } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });

  useEffect(() => {
    if (pageUrl && myInfo) {
      if (myInfo && urlMatched(myInfo.url, pageUrl)) {
        setUserMatched(true);
        setUserSeq(myInfo.user_seq);
        setNickname(myInfo.nickname);
      } else {
        setUserMatched(false);
        requestPageUserInfo();
      }
    }
  }, [pageUrl, myInfo]);

  useEffect(() => {
    if (pageUserRes && pageUserRes.data) {
      const { code, data, message } = pageUserRes.data;
      if (isError(code) && urlOwnerNotFound(message)) {
        alert('페이지를 찾을 수 없습니다.');
        history.goBack();
      } else if (isError(code)) {
        alert('데이터 베이스 에러입니다.');
      }
      if (data) {
        setUserSeq(data.user_seq);
        setNickname(data.nickname);
      }
    }
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

  const { save } = useSaveWidget();

  useEffect(() => {
    if (widgetRes) {
      save(widgetRes.data.widget_list);
    }
  }, [widgetRes]);

  return (
    <PageWrapper>
      <NormalWrapper>
        <Header
          userMatch={userMatched}
          pageUrl={pageUrl}
          pageUserName={nickname}
          pageType='normal'
        />
        <NormalModeGrid />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
