import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/css';
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
import { useGetUrl } from '../hooks/util';
import { useMyInfo } from '../hooks/myInfo';
import { useSaveWidgetsFromServer } from '../hooks/widget';
import { useRequest } from '../hooks/useRequest';
import { breakpoints } from '../styles/GlobalStyles';

function NormalMode() {
  const pageUrl = useGetUrl();
  const [userSeq, setUserSeq] = useState(null);
  const [userMatched, setUserMatched] = useState(null);
  const [nickname, setNickname] = useState(null);
  const history = useHistory();
  const { myInfo } = useMyInfo();
  const { res: pageUserRes, request: requestPageUserInfo } = useRequest({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });

  const [width, setWidth] = useState(window.innerWidth);
  const [mobileMode, setMobileMode] = useState(false);
  useEffect(() => {
    if (width) {
      if (width <= breakpoints[0]) {
        setMobileMode(true);
      } else if (width > breakpoints[0]) {
        setMobileMode(false);
      }
    }
    return () => setMobileMode(false);
  }, [width]);
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });

  useEffect(() => {
    if (pageUrl) {
      if (myInfo && urlMatched(myInfo.url, pageUrl)) {
        setUserMatched(true);
        setUserSeq(myInfo.user_seq);
        setNickname(myInfo.nickname);
      } else {
        setUserMatched(false);
        requestPageUserInfo();
      }
    }
    return () => {
      setUserMatched(null);
    };
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

  const { res: widgetRes, request: requestWidgetData } = useRequest({
    endpoint: `${getApiEndpoint()}/user/${userSeq}/widgets`,
    method: 'get',
  });

  useEffect(() => {
    if (userSeq) {
      requestWidgetData();
    }
  }, [userSeq, requestWidgetData]);

  const { save } = useSaveWidgetsFromServer();

  useEffect(() => {
    if (widgetRes) {
      save(widgetRes.data.widget_list);
    }
  }, [widgetRes]);

  const getThumbnailData = useCallback(() => {
    if (widgetRes) {
      const { widget_list } = widgetRes.data;
      if (!widget_list) {
        return null;
      }
      const thumbnail_list = widget_list.map((element) => {
        if (element.widget_data && element.widget_data.thumbnail) {
          return element.widget_data.thumbnail;
        }
        return null;
      });
      return thumbnail_list;
    }
    return null;
  }, [widgetRes]);

  const thumbnailImages = useMemo(() => {
    const thumbnailData = getThumbnailData();
    if (thumbnailData) {
      return thumbnailData.map((element) => {
        return (
          <div css={ThumbnailImage}>
            <img src={element} />
          </div>
        );
      });
    }
    return null;
  }, [getThumbnailData]);

  return (
    <PageWrapper>
      <NormalWrapper>
        {!mobileMode && (
          <Header
            userMatch={userMatched}
            pageUrl={pageUrl}
            pageUserName={nickname}
            pageType='normal'
          />
        )}
        {mobileMode && (
          <div css={ThumbnailImagesContainer}>{thumbnailImages}</div>
        )}
        {!mobileMode && <NormalModeGrid />}
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;

const ThumbnailImagesContainer = css`
  display: flex;
  width: 100px;
`;
const ThumbnailImage = css``;
