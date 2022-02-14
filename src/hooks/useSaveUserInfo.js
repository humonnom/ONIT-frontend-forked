import { useDispatch } from 'react-redux';
import { createReplacementUserAction } from '../redux/slice';

function useSaveUserInfo() {
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
    console.log(data);
    if (data) {
      updateAll(data);
    }
  };

  return {
    save,
  };
}

export default useSaveUserInfo;
