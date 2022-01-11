import React, { useEffect } from 'react';
import axios from 'axios';

function RenderUserName() {
  console.log('RenderUserName page');
  const accessToken = localStorage.getItem('access_token');
  const user_seq = localStorage.getItem('user_seq');

  const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/user/${user_seq}`;
  const fetchTokens = async () => {
    try {
      const response = await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('get name => data:', response.data);
    } catch (err) {
      console.log('get name(catch err)');
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return <div>get name</div>;
}

export default RenderUserName;
