import { ACTION_CREATE } from './constantValue';

function changeKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
  return obj;
}

function deleteKey(obj, targetKey) {
  delete obj[targetKey];
  return obj;
}

export function convertForServer(infos) {
  const converted = JSON.parse(JSON.stringify(infos));
  converted.map(function (info, index) {
    changeKey(info, 'x', 'pos_x');
    changeKey(info, 'y', 'pos_y');
    changeKey(info, 'w', 'width');
    changeKey(info, 'h', 'height');
    deleteKey(info, 'i');
    if (info.widget_action === ACTION_CREATE) {
      info.widget_code = '';
    }
    return info;
  });
  return converted;
}

function createIdKey(obj, index) {
  // obj.i = obj.widget_code.replace(/^\D+/g, ''); // or using index;
  obj.i = index.toString();
  return obj;
}

export function convertForRedux(infos) {
  const converted = JSON.parse(JSON.stringify(infos));
  converted.map(function (info, index) {
    changeKey(info, 'pos_x', 'x');
    changeKey(info, 'pos_y', 'y');
    changeKey(info, 'width', 'w');
    changeKey(info, 'height', 'h');
    createIdKey(info, index);
    console.log(typeof info.i);
    return info;
  });
  return converted;
}
// export function convertForRedux(infos) {
//   return infos.map(function (info) {
//     const newInfo = {
//       x: info.pos_x,
//       y: info.pos_y,
//       w: info.width,
//       h: info.height,
//       i: info.widget_code,
//       widget_action: info.widget_action,
//       widget_type: info.widget_type,
//       widget_data: info.widget_data,
//     };
//     return newInfo;
//   });
// }
