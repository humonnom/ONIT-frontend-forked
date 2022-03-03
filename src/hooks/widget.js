import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createReplacementWidgetsAction } from '../redux/slice';
import { convertForRedux, convertForServer } from '../utils/convert';
import { useMyInfo } from './myInfo';
import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint } from '../utils/util';
import {
  ACTION_CREATE,
  ACTION_EDIT,
  ACTION_NONE,
  TYPE_IMAGE,
  TYPE_NEW,
} from '../utils/constantValue';

// init new widget
export function useInitWidget() {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const dispatch = useDispatch();

  const initImageWidget = ({ thumbnail, url }) => {
    const changed = JSON.parse(JSON.stringify(widgets.list));
    const targetId = modal.imgChangeTargetId;
    const targetItem = changed.find((widget) => widget.i === targetId);
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
  };

  const updateRedux = (changed) => {
    if (changed) {
      dispatch(
        createReplacementWidgetsAction({
          ...widgets,
          list: changed,
        })
      );
    }
  };

  const init = ({ type, data }) => {
    if (data) {
      if (type === TYPE_IMAGE) {
        initImageWidget(data);
      }
    }
  };
  return { init };
}

// save widget data to redux (no need convert)
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
      setUrl(res.data.data.thumbnail);
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
  const dispatch = useDispatch();

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
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        count: widgets.count + 1,
        list: [...widgets.list, newWidget],
      })
    );
  };

  return {
    addEmptyWidget,
  };
}
export function useRemoveEmptyWidget() {
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const dispatch = useDispatch();

  const removeEmptyWidget = useCallback(() => {
    console.log('remove');
    const converted = widgets.list.filter(function (element) {
      return element.widget_type !== TYPE_NEW;
    });
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        count: converted.lenth,
        list: [converted],
      })
    );
  }, [widgets]);

  return {
    removeEmptyWidget,
  };
}
