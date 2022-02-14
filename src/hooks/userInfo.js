import { useDispatch, useSelector } from 'react-redux';
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
