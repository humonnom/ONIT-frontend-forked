const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const widget1 = {
  i: 1,
  x: 2,
  y: 3,
  w: 3,
  h: 4,
  type: 'photo',
  data: {
    url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtOcFD%2FbtqQ7UbH7rb%2FfLOIKxZ6cKDbxfAkGpQErK%2Fimg.png',
  },
};

const widget2 = {
  i: 2,
  x: 0,
  y: 0,
  w: 4,
  h: 2,
  type: 'text',
  data: {
    contents: '나는 메모장이야.',
  },
};

app.get('/widgets', (req, res) => {
  res.json({
    success: true,
    data: {
      count: 2,
      list: [widget1, widget2],
    },
    message: '위젯정보 불러오기 성공',
  });
});

app.listen(9000, () => {
  console.log('listening 9000');
});
