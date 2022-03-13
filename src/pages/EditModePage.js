import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import PopWidgets from '../components/Widgets/Pop/PopWidgets';
import { PageWrapper, EditModeGrid, EditWrapper, Header } from '../components';
import { getApiEndpoint, urlMatched } from '../utils/util';
import { useRequestAuth } from '../hooks/useRequestAuth';
import { useSaveWidgetsFromServer } from '../hooks/widget';
import { useGetUrl } from '../hooks/util';
import { useMyInfo } from '../hooks/myInfo';

function EditMode() {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));
  const pageUrl = useGetUrl();
  const [userSeq, setUserSeq] = useState(null);
  const [userMatched, setUserMatched] = useState(null);
  const history = useHistory();
  const { myInfo } = useMyInfo();

  useEffect(() => {
    if (pageUrl && myInfo) {
      if (myInfo && urlMatched(myInfo.url, pageUrl)) {
        setUserMatched(true);
        setUserSeq(myInfo.user_seq);
      } else {
        setUserMatched(false);
        history.push(`/${pageUrl}`);
      }
    }
    return () => {
      setUserMatched(null);
      setUserSeq(null);
    };
  }, [pageUrl, myInfo]);

  const { res: widgetRes, request: requestWidgetData } = useRequestAuth({
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

  return (
    <PageWrapper>
      {userMatched && <Header userMatch pageUrl={pageUrl} pageType='edit' />}
      <EditWrapper>
        {modal.popUpWindow && <PopWidgets />}
        <EditModeGrid />
      </EditWrapper>
    </PageWrapper>
  );
}

export default EditMode;
