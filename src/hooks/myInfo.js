import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint } from '../utils/util';
import { createReplacementUserAction } from '../redux/slice';

export function useGetUserInfo() {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.info.user,
  }));

  return {
    userInfo: userInfo,
  };
}

export function useSaveUserInfo() {
  const dispatch = useDispatch();

  const updateAll = ({ nickname, url, user_seq, field }) => {
    dispatch(
      createReplacementUserAction({
        url,
        field,
        nickname,
        user_seq,
      })
    );
  };

  const save = (data) => {
    if (data) {
      updateAll(data);
    }
  };

  return {
    save,
  };
}

export function useMyInfo() {
  const { res, request } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/me`,
    method: 'get',
  });
  // const { userInfo: currentInfo } = useGetUserInfo();
  const { save } = useSaveUserInfo();
  const [userInfo, setUserInfo] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (res && res.data) {
      if (res.data.code === 'ok') {
        setLoggedIn(true);
        setUserInfo(res.data.data);
        save(userInfo);
      }
    }
  }, [save, res]);

  return {
    loggedIn,
    userInfo,
  };
}
