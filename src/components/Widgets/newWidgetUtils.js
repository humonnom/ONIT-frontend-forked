import React from 'react';
import { ACTION_CREATE, TYPE_IMAGE } from '../../utils/constantValue';

export function addNewWidget(props) {}

export function setNewWigetInfo(newWidgetInfo, size, count) {
  // small이 디폴트
  let widthInitValue = 2;
  let heightInitValue = 2;
  if (size === 'm') {
    widthInitValue = 4;
    heightInitValue = 4;
  }
  if (size === 'l') {
    widthInitValue = 6;
    heightInitValue = 6;
  }
  const converted = {
    widget_action: ACTION_CREATE,
    widget_code: '',
    widget_type: TYPE_IMAGE,
    widget_data: {
      thumbnail:
        'https://66.media.tumblr.com/debc80cdb270210bd22560d1433c6862/b023e573433c23b1-76/s540x810/e0126b01467d0ee0c7324b2b9fa0d2699f76ad14.png',
    },
    i: count.toString(),
    x: newWidgetInfo.x,
    y: newWidgetInfo.y,
    w: widthInitValue,
    h: heightInitValue,
  };
  return converted;
}
