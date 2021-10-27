import React from 'react';

export default function AddNewWidget({
  widgets,
  widget_type,
  index,
  widget_data,
}) {
  console.log(widgets);
  console.log('위에');
  const newWidgets = widgets.list.concat({
    i: { index },
    x: 3,
    y: 5,
    w: 4,
    h: 2,
    widget_code: '',
    widget_action: 'c',
    widget_type: { widget_type },
    widget_deleted: 'N',
    widget_data: { widget_data },
  });
  return newWidgets;
}
