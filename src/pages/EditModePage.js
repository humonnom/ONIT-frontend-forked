import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageWrapper, ToolBar, EditModeGrid, EditWrapper } from '../components';
// import getLoginState from './getLoginState';
import { useWidgetData } from '../hooks/useWidgetData';
import PopWidgets from '../components/Widgets/Pop/PopWidgets';
import { getPageUser } from '../utils/parsing';
import { convertForRedux } from '../utils/convert';
import { createReplacementWidgetsAction } from '../redux/slice';
import { moveTo } from '../utils/router';

function EditMode() {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));
  const pageUserSeq = getPageUser();
  const userSeq = localStorage.getItem('user_seq');
  const { res } = useWidgetData(pageUserSeq, 'edit');
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
    console.log('res', res);
    if (res === null) {
      moveTo(`/${userSeq}/normal`);
      alert('잘못된 접근입니다.');
    }
    if (res) {
      setWidgetState(res.data.widget_list);
    }
  }, [res]);

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
