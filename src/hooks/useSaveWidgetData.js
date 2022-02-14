import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createReplacementWidgetsAction } from '../redux/slice';
import { convertForRedux } from '../utils/convert';

function useSaveWidgetData({ widgetsData }) {
  const dispatch = useDispatch();

  const setWidgetState = (widget_data) => {
    const convertedForRedux = convertForRedux(widget_data);
    dispatch(
      createReplacementWidgetsAction({
        count: convertedForRedux.length,
        list: convertedForRedux,
      })
    );
  };

  const save = useCallback(() => {
    if (widgetsData) {
      setWidgetState(widgetsData);
    }
  }, [widgetsData]);

  return {
    save,
  };
}

export default useSaveWidgetData;
