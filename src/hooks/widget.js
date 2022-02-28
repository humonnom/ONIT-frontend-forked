import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { createReplacementWidgetsAction } from '../redux/slice';
import { convertForRedux, convertForServer } from '../utils/convert';
import { useMyInfo } from './myInfo';
import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint } from '../utils/util';

export function useSaveWidget() {
  const dispatch = useDispatch();

  const setWidgetState = (widgetList) => {
    const convertedForRedux = convertForRedux(widgetList);
    dispatch(
      createReplacementWidgetsAction({
        count: convertedForRedux.length,
        list: convertedForRedux,
      })
    );
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
        alert('로그인을 다시 해주세요.');
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
