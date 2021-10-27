import { map, words } from 'lodash';
import apiUtil from './apiUtil';
import useFetch from './useFetch';

async function postWidgetsInfo(widgets) {
  // function makeActionValue(originInfos, newInfos) {
  //   const i = 0;
  //   while (originInfos[i]) {
  //     if (JSON.stringify(originInfos[i]) !== JSON.stringify(newInfos[i])) {
  //       if (newInfos[i].widget_deleted == 'Y') newInfos[i].widget_action = 'd';
  //       else newInfos[i].widget_action = 'e';
  //     }
  //     i++;
  //   }
  //   while (newInfos[i]) {
  //     newInfos[i].widget_action = 'c';
  //     i++;
  //   }
  //   return newInfos;
  // }
  // const { widgets } = useAppSelector((state) => ({
  //   widgets: state.info.widgets,
  // }));

  // const dispatch = useDispatch();

  // function getNewWidetsList(origin, infos) {
  //   return origin.map(function (widget) {
  //     const newWidget = JSON.parse(JSON.stringify(widget));
  //     const info = infos.find((element) => element.i === widget.i);
  //     newWidget.x = info.x;
  //     newWidget.y = info.y;
  //     newWidget.w = info.w;
  //     newWidget.h = info.h;
  //     return newWidget;
  //   });
  // }

  // const newWidgetsList = getNewWidetsList(widgets.list, layout);
  // dispatch(
  //   createReplacementWidgetsAction({
  //     ...widgets,
  //     list: newWidgetsList,
  //   })
  // );

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
