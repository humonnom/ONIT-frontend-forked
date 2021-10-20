import { useEffect, useState } from 'react';

export default async function useFetch(url) {
  async function get_data(urls) {
    const res = await fetch(urls);
    const is_ok = res.ok;
    if (!is_ok) {
      console.log('fetch error');
      return 1;
    }
    const json = await res.json();
    console.log(`fetch result : `);
    console.log(json);
    return json;
  }
  const data = get_data(url);

  return data;
}
