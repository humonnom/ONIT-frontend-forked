import { Header, NormalWrapper, PageWrapper } from '../components';
import MainContents from '../components/Main/MainContents';
// 주소, basic svg, hover svg

function MainPage() {
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
