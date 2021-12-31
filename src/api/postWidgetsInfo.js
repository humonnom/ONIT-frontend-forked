async function postWidgetsInfo(widgets) {
  fetch(`http://localhost:3001/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      i: '5',
      x: widgets.list[1].x,
      y: widgets.list[1].y,
    }),
  }).then((res) => {
    if (res.ok) {
      alert('저장이 완료되었습니다');
    } else console.log('저장에 실패하였습니다');
  });
}

export default postWidgetsInfo;
