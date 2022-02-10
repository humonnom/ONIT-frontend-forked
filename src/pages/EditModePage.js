import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PageWrapper, ToolBar, EditModeGrid, EditWrapper } from '../components';
import { useWidgetData } from '../hooks/useWidgetData';
import PopWidgets from '../components/Widgets/Pop/PopWidgets';
import { getPageUrl, getApiEndpoint } from '../utils/util';
import { convertForRedux } from '../utils/convert';
import { createReplacementWidgetsAction } from '../redux/slice';
import { useRequestAuth } from '../hooks/useRequestAuth';

function EditMode() {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  const history = useHistory();
  const pageUrl = getPageUrl();

  // get page user's info
  const { res: pageUserRes, request: pageUserRequest } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/url/${pageUrl}/user`,
    method: 'get',
  });

  const pageUserInfo = useMemo(() => {
    if (pageUserRes && pageUserRes.data) {
      console.log(pageUserRes);
      const { code, data, message } = pageUserRes.data;
      // TODO: code로 match 하는지 받을 수 있음
      console.log(code);
      if (code === 'error' && message === 'no user information') {
        alert('없는 페이지 입니다.');
        history.push(`${pageUrl}`);
      } else if (code === 'error') {
        alert('db error');
      }
      console.log(data);
      if (data) return data;
    }
    return null;
  }, [pageUserRes]);

  useEffect(() => {
    if (pageUserInfo && !pageUserInfo.user_matched) {
      history.push(`/${pageUrl}`);
    }
  }, [pageUserInfo]);

  const pageUserSeq = useMemo(() => {
    if (pageUserInfo) {
      return pageUserInfo.user_seq;
    }
    return null;
  }, [pageUserInfo]);

  useEffect(() => {
    if (pageUserInfo) {
      localStorage.setItem('user_seq', pageUserInfo.user_seq);
      localStorage.setItem('page_url', pageUserInfo.url);
    }
  }, [pageUserInfo]);

  const { res: widgetRes, request: widgetRequest } = useWidgetData({
    pageUserSeq,
    dest: 'edit',
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
    console.log('edit page');
    pageUserRequest();
  }, []);

  useEffect(() => {
    if (pageUserSeq) {
      console.log(pageUserSeq);
      widgetRequest();
    }
  }, [pageUserSeq, widgetRequest]);

  const widgetsData = useMemo(() => {
    if (widgetRes && widgetRes.data) {
      const { code: resCode, data } = widgetRes;
      console.log(resCode);
      console.log(data);
      return data;
    }
    return null;
  }, [widgetRes]);

  useEffect(() => {
    console.log(widgetsData);
    if (widgetsData) {
      console.log('set');
      setWidgetState(widgetsData.widget_list);
    }
  }, [widgetsData]);

  return (
    <PageWrapper>
      <ToolBar />
      <EditWrapper>
        {modal.popUpWindow && <PopWidgets />}
        <EditModeGrid />
      </EditWrapper>
    </PageWrapper>
  );
}
export default EditMode;
