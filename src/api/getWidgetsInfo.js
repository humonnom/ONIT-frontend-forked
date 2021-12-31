import useFetch from './useFetch';

async function getWidgetsInfo() {
  const data = await useFetch('http://localhost:3001/list');
  console.log('data_catch');
  console.log(data);
  return data;
}

export default getWidgetsInfo;
