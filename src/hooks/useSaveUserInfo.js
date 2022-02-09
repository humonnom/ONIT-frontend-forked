import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementUserAction } from '../redux/slice';

function useSaveUserInfo(...args) {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.info.user,
  }));
  const dispatch = useDispatch();

  const updateNickname = (nickname) => {
    dispatch(
      createReplacementUserAction({
        ...userInfo,
        nickname,
      })
    );
  };
  const updateUserSeq = (user_seq) => {
    dispatch(
      createReplacementUserAction({
        ...userInfo,
        user_seq,
      })
    );
  };
  const updateUrl = (url) => {
    dispatch(
      createReplacementUserAction({
        ...userInfo,
        url,
      })
    );
  };
  const updateField = (field) => {
    dispatch(
      createReplacementUserAction({
        ...userInfo,
        field,
      })
    );
  };

  const request = useCallback(() => {
    if (args.nickname) updateNickname(args.nickname);
    if (args.url) updateUrl(args.url);
    if (args.userSeq) updateUserSeq(args.userSeq);
    if (args.field) updateField(args.field);
  }, [args]);

  return {
    res: userInfo,
    request: request,
  };
}

export default useSaveUserInfo;
