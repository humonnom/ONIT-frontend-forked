import React, { useEffect } from 'react';
import axios from 'axios';
import { getApiEndpoint } from './util';

function RenderUserName() {
  const accessToken = localStorage.getItem('access_token');
  const user_seq = localStorage.getItem('user_seq');

  const endPoint = `${getApiEndpoint()}/user/${user_seq}`;
  const fetchTokens = async () => {
    try {
      await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return <div>get name</div>;
}

export default RenderUserName;
