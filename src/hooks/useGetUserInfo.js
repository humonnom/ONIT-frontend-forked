import { useSelector } from 'react-redux';

function useGetUserInfo() {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.info.user,
  }));

  return {
    userInfo: userInfo,
  };
}

export default useGetUserInfo;
