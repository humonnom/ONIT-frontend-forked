import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  NormalWrapper,
  NormalModeGrid,
  PageWrapper,
  Header,
} from '../components';
import { getPageUrl, getApiEndpoint } from '../utils/util';
import { useWidgetData } from '../hooks/useWidgetData';
import { convertForRedux } from '../utils/convert';
import { createReplacementWidgetsAction } from '../redux/slice';
import { useRequestAuth } from '../hooks/useRequestAuth';

// edit페이지로 이동할 수 있는 권한을 체크할 방법이 필요함
// 1. me로 요청해서 확인한다.
// 2. 프론트에서 처음에 로그인하면 유저정보를 redux에 넣어놓고 persist를 써서 계속 가지고 있는다.
// 3. 백엔드에서 토큰으로 처리한다.
//
function NormalMode() {
  const pageUrl = getPageUrl();

  // get page user's info
  const { res: pageUserRes, request: pageUserRequest } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });

  const pageUserInfo = useMemo(() => {
    if (pageUserRes && pageUserRes.data) {
      const { code, data, message } = pageUserRes.data;
      if (code === 'error' && message === 'no user information') {
        alert('page user not found');
      } else if (code === 'error') {
        alert('db error');
      }
      if (data) return data;
    }
    return null;
  }, [pageUserRes]);

  const pageUserSeq = useMemo(() => {
    if (pageUserInfo) {
      return pageUserInfo.user_seq;
    }
    return null;
  }, [pageUserInfo]);

  const pageUserName = useMemo(() => {
    if (pageUserInfo) {
      return pageUserInfo.nickname;
    }
    return null;
  }, [pageUserInfo]);

  // TODO: code 맞추기
  const userMatch = useMemo(() => {
    if (pageUserInfo) {
      return pageUserInfo.user_matched;
    }
    return null;
  }, [pageUserInfo]);

  const { res: widgetRes, request: widgetRequest } = useWidgetData({
    pageUserSeq,
    dest: 'normal',
  });

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
    pageUserRequest();
  }, []);

  useEffect(() => {
    if (pageUserSeq) {
      widgetRequest();
    }
  }, [pageUserSeq, widgetRequest]);

  const widgetsData = useMemo(() => {
    if (widgetRes && widgetRes.data) {
      const { data } = widgetRes;
      return data;
    }
    return null;
  }, [widgetRes]);

  useEffect(() => {
    if (widgetsData) {
      setWidgetState(widgetsData.widget_list);
    }
  }, [widgetsData]);

  return (
    <PageWrapper>
      <NormalWrapper>
        <Header
          userMatch={userMatch}
          pageUrl={pageUrl}
          pageUserName={pageUserName}
          pageType='normal'
        />
        <NormalModeGrid />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
