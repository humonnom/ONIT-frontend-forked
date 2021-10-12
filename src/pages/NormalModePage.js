import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NormalWrapper, AllWidgets, PageWrapper, Header } from '../components';
import getWidgetsInfo from '../api/getWidgetsInfo';
import { createReplacementWidgetsAction } from '../redux/slice';

function NormalMode(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const setWidgetState = async () => {
      // update from server
      const widgetsInfo = await getWidgetsInfo();
      console.log(widgetsInfo);
      dispatch(
        createReplacementWidgetsAction({
          count: widgetsInfo.data.count,
          list: widgetsInfo.data.list,
        })
      );
    };
    setWidgetState();
  }, []);

  return (
    <PageWrapper>
      <NormalWrapper>
        <Header />
        <AllWidgets />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default NormalMode;
