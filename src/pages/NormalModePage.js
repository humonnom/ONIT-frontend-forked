/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
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
import { breakpoints, FlexCenter, FlexColCenter } from '../styles/GlobalStyles';
import { TYPE_IMAGE, TYPE_VIDEO } from '../utils/constantValue';
import VideoBox from '../components/Widgets/Video/VideoBox';

function getOrderedWidgetList(origin) {
  if (origin === null) {
    return null;
  }
  const arrY = origin.map((element) => element.pos_y);
  const maxY = Math.max(...arrY);
  let ordered = [];
  for (let i = arrY[0]; i <= maxY; i += 1) {
    const arr = origin.filter((element) => element.pos_y === i) || null;
    if (arr.length !== 0) {
      arr.sort((a, b) => (a.pos_x > b.pos_x ? 1 : -1));
      ordered = ordered.concat(arr);
    }
  }
  return ordered;
}

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
      setUserSeq(null);
      setNickname(null);
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

  const ThumbnailImage = useMemo(() => {
    if (widgetRes) {
      const { widget_list } = widgetRes.data;
      const filtered = widget_list.filter(
        (element) => element.widget_data !== {} && element.widget_data.thumbnail
      );
      const ordered = getOrderedWidgetList(filtered);
      if (ordered) {
        return ordered.map((element) => {
          if (element.widget_type === TYPE_IMAGE) {
            return (
              <img
                key={element.widget_code}
                src={element.widget_data.thumbnail}
                alt='thumbnail'
                css={ThumbnailStyle}
              />
            );
          } else if (element.widget_type === TYPE_VIDEO) {
            return (
              <div css={ThumbnailStyle}>
                <VideoBox element={element} mode='normal' />
              </div>
            );
          } else {
            return <></>;
          }
        });
      }
    }
    return <div>test</div>;
  }, [widgetRes]);

  return (
    <PageWrapper>
      {mobileMode && <div css={ThumbnailImagesContainer}>{ThumbnailImage}</div>}
      {!mobileMode && (
        <NormalWrapper>
          <Header
            userMatch={userMatched}
            pageUrl={pageUrl}
            pageUserName={nickname}
            pageType='normal'
          />
          <NormalModeGrid />
        </NormalWrapper>
      )}
    </PageWrapper>
  );
}

export default NormalMode;

const ThumbnailImagesContainer = css`
  max-width: 100%;
  height: 100%;
  ${FlexColCenter}
  padding: 48px 40px 0 40px;
`;
const ThumbnailStyle = css`
  ${FlexCenter}
  max-width: 100%;
  margin-bottom: 16px;
  width: 348px;
  height: 260px;
  object-fit: cover;
`;
