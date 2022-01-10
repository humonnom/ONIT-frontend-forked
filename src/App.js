import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router';
import { PageWrapper, HandleKakaoLogin, RenewAccessToken } from './components';
import {
  LoginPage,
  MainPage,
  SaveEditPageData,
  EditModePage,
  NormalModePage,
} from './pages';

function App() {
  return (
    <PageWrapper>
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/main' component={MainPage} />
          <Route exact path='/callback/kakao' component={HandleKakaoLogin} />
          <Route
            exact
            path='/:id/auth/token/refresh'
            component={RenewAccessToken}
          />
          <Route exact path='/:id/normal' component={NormalModePage} />
          <Route exact path='/:id/edit' component={EditModePage} />
          <Route exact path='/:id/save' component={SaveEditPageData} />
          <Route
            exact
            path='/testtest'
            component={function () {
              const history = useHistory();
              useEffect(() => {
                history.push('/1/normal');
              }, []);
              return <></>;
            }}
          />
          <Route path='/'>
            <div>error</div>
          </Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
}

export default App;
