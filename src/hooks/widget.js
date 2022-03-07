import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createReplacementWidgetsAction } from '../redux/slice';
import { convertForRedux, convertForServer } from '../utils/convert';
import { useMyInfo } from './myInfo';
import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint, isOk } from '../utils/util';
import {
  ACTION_CREATE,
  ACTION_EDIT,
  ACTION_NONE,
  TYPE_IMAGE,
  TYPE_NEW,
} from '../utils/constantValue';

export function useInitWidget() {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const dispatch = useDispatch();

  const updateRedux = useCallback(
    (changed) => {
      if (changed) {
        dispatch(
          createReplacementWidgetsAction({
            ...widgets,
            list: changed,
          })
        );
      }
    },
    [widgets]
  );

  const initImageWidget = useCallback(
    ({ thumbnail, url }) => {
      const changed = JSON.parse(JSON.stringify(widgets.list));
      const targetId = modal.imgChangeTargetId;
      const targetItem = changed.find((widget) => widget.i === targetId);
      if (!targetItem) {
        console.error('해당하는 위젯을 찾지 못했습니다.');
      } else {
        targetItem.widget_type = TYPE_IMAGE;
        targetItem.widget_data = {
          thumbnail: `${thumbnail}`,
          url: `${url}`,
        };
        if (
          targetItem.widget_action === ACTION_NONE ||
          targetItem.widget_code !== ''
        ) {
          targetItem.widget_action = ACTION_EDIT;
        }
        updateRedux(changed);
      }
    },
    [modal, updateRedux]
  );

  const init = useCallback(
    ({ type, data }) => {
      if (data) {
        if (type === TYPE_IMAGE) {
          initImageWidget(data);
        }
      }
    },
    [initImageWidget]
  );

  return { init };
}

export function useUpdateWidgetsData() {
  const dispatch = useDispatch();

  const updateWidgets = (newData) => {
    dispatch(
      createReplacementWidgetsAction({
        count: newData.length,
        list: newData,
      })
    );
  };
  return { updateWidgets };
}

// save widget data from server (need convert)
export function useSaveWidgetsFromServer() {
  const { updateWidgets } = useUpdateWidgetsData();

  const setWidgetState = (widgetList) => {
    const converted = convertForRedux(widgetList);
    updateWidgets(converted);
  };

  const save = (data) => {
    if (data) {
      setWidgetState(data);
    }
  };
  return { save };
}

export function usePostData() {
  const history = useHistory();
  const { myInfo } = useMyInfo();
  const [postData, setPostData] = useState(null);

  const userSeq = useMemo(() => {
    if (myInfo) {
      return myInfo.user_seq;
    }
    return null;
  }, [myInfo]);

  const { res, request } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/user/${userSeq}/widgets/save`,
    method: 'post',
    data: postData,
  });

  useEffect(() => {
    if (postData && userSeq) {
      request();
    }
  }, [postData, userSeq]);

  useEffect(() => {
    if (res && res.data) {
      if (res.data.code === 'wrong_token') {
        history.push(`/login`);
      } else {
        history.push(`/${myInfo ? myInfo.url : '/'}`);
      }
    }
  }, [res]);

  const post = (data) => {
    if (data) {
      setPostData(convertForServer(data));
    }
  };
  return { post };
}

export function usePostImage() {
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const { res, request: post } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/local/image`,
    method: 'post',
    data,
    contentType: 'multipart/form-data',
  });

  useEffect(() => {
    if (res && res.data) {
      if (isOk(res.data.code)) {
        setUrl(res.data.data.thumbnail);
      }
    }
    return () => {
      setUrl(null);
    };
  }, [res]);

  useEffect(() => {
    if (data) {
      post();
    }
  }, [data]);

  const request = (files) => {
    const formData = new FormData();
    formData.append('image_file', files[0]);
    setData(formData);
  };

  return {
    s3url: url,
    request,
  };
}

export function useAddEmptyWidget() {
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const { updateWidgets } = useUpdateWidgetsData();

  const addEmptyWidget = (mouseOverWidget) => {
    const newWidget = {
      widget_action: ACTION_CREATE,
      widget_code: '',
      widget_type: TYPE_NEW,
      widget_data: {},
      i: `${widgets.count + 1}`,
      x: mouseOverWidget[0].x,
      y: mouseOverWidget[0].y,
      w: 1,
      h: 1,
    };
    updateWidgets([...widgets.list, newWidget]);
  };

  return {
    addEmptyWidget,
  };
}
export function useRemoveEmptyWidget() {
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const { updateWidgets } = useUpdateWidgetsData();
  const removeEmptyWidget = () => {
    const converted = widgets.list.filter(function (element) {
      return element.widget_type !== TYPE_NEW;
    });
    updateWidgets(converted);
  };

  return {
    removeEmptyWidget,
  };
}

export function useDetachOutsideClick(ref) {
  const [detached, setDetached] = useState(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDetached(true);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return { detached };
}
