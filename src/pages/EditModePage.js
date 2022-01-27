import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { PageWrapper, ToolBar, EditModeGrid, EditWrapper } from '../components';
import { useWidgetData } from '../hooks/useWidgetData';
import PopWidgets from '../components/Widgets/Pop/PopWidgets';
import { getPageUser } from '../utils/parsing';
import { isExpiredToken, isInvalidToken, isNotOwner } from '../utils/util';
import { convertForRedux } from '../utils/convert';
import { createReplacementWidgetsAction } from '../redux/slice';

function EditMode() {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));
  const pageUserSeq = getPageUser();
  // const userSeq = localStorage.getItem('user_seq');
  const { res } = useWidgetData(pageUserSeq, 'edit');
  const [storeRequired, setStoreRequired] = useState(false);
  const dispatch = useDispatch();
  // const history = useHistory();

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
    if (storeRequired) {
      if (res.data.widget_list) {
        setWidgetState(res.data.widget_list);
      }
      setStoreRequired(false);
    }
  }, [storeRequired]);

  useEffect(() => {
    if (res && res.data) {
      const { code } = res.data;
      if (isExpiredToken(code) || isInvalidToken(code) || isNotOwner(code)) {
        console.log(`=> error code ${res.data.code}`);
        // history.push(`/${userSeq}`);
      } else {
        setStoreRequired(true);
      }
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
