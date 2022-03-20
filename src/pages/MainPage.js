import { Header, NormalWrapper, PageWrapper } from '../components';
import { useMyInfo } from '../hooks/myInfo';
import MainContents from '../components/Main/MainContents';
// 주소, basic svg, hover svg

function MainPage() {
  const { myInfo } = useMyInfo();

  console.log(myInfo);
  return (
    <PageWrapper>
      <NormalWrapper>
        <Header pageType='main' />
        <MainContents />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default MainPage;
