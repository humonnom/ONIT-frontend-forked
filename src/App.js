import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PageWrapper } from './components';
import { NormalModePage, EditModePage, Main } from './pages';
import getWidgetsInfo from './api/getWidgetsInfo';
import {
  createReplacementWidgetsAction,
  // createReplacementNewWidgetsAction,
} from './redux/slice';
import HandleKakaoLogin from './components/login/HandleKakaoLogin';
import RenewAccessToken from './components/RenewAccessToken';
import RenderNormalPage from './pages/RenderNormalPage';
import RenderEditPage from './pages/RenderEditPage';
import { convertForRedux, convertForServer } from './utils/convert';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const setWidgetState = async () => {
      // update from server
      const info = await getWidgetsInfo();

      // const convertedForServer = convertForServer(info);
      // console.log(`convert for server :`);
      // console.log(convertedForServer);

      const convertedForRedux = await convertForRedux(info);
      console.log(`convert for redux :`);
      console.log(convertedForRedux);
      dispatch(
        createReplacementWidgetsAction({
          count: info.length,
          list: convertedForRedux,
        })
      );
    };
    setWidgetState();
  }, [dispatch]);

  return (
    <PageWrapper>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/callback/kakao' component={HandleKakaoLogin} />
          <Route
            exact
            path='/auth/token/refresh'
            component={RenewAccessToken}
          />
          <Route
            exact
            path='/user/:userId/normal'
            component={RenderNormalPage}
          />
          <Route exact path='/user/:userId/edit' component={RenderEditPage} />
          <Route exact path='/normal'>
            <NormalModePage />
          </Route>
          <Route exact path='/edit'>
            <EditModePage />
          </Route>
          <Route path='/'>
            <div>error</div>
          </Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
}

export default App;
