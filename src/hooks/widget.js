import { useDispatch } from 'react-redux';
import { createReplacementWidgetsAction } from '../redux/slice';
import { convertForRedux } from '../utils/convert';

export function useSaveWidget() {
  const dispatch = useDispatch();

  const setWidgetState = (widgetList) => {
    const convertedForRedux = convertForRedux(widgetList);
    dispatch(
      createReplacementWidgetsAction({
        count: convertedForRedux.length,
        list: convertedForRedux,
      })
    );
  };

  const save = (data) => {
    if (data) {
      setWidgetState(data);
    }
  };

  return { save };
}
