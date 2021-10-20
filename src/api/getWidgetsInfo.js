import { useEffect, useState } from 'react';
import apiUtil from './apiUtil';
import useFetch from './useFetch';

async function getWidgetsInfo() {
  // const params = new URLSearchParams();
  // return apiUtil('GET', 'widgets', params);

  // tmp update from localhost
  // const data = JSON.parse(localStorage.getItem('widgets'));
  // const result = {
  //   data,
  // };
  // return result;

  const data = await useFetch(
    'http://bdbc-1-232-34-156.ngrok.io/user/1/normal'
  );
  console.log('data_catch');
  console.log(data);
  return data;
}

export default getWidgetsInfo;
