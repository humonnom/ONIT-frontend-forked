import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createReplacementWidgetsAction } from '../redux/slice';
import { convertForRedux } from '../utils/convert';

function useSaveWidgetData() {
  const dispatch = useDispatch();

  const setWidgetState = (widgetsData) => {
    const convertedForRedux = convertForRedux(widgetsData);
    dispatch(
      createReplacementWidgetsAction({
        count: convertedForRedux.length,
        list: convertedForRedux,
      })
    );
  };

  const save = useCallback((widgetsData) => {
    if (widgetsData) {
      setWidgetState(widgetsData);
    }
  }, []);

  return {
    save,
  };
}

export default useSaveWidgetData;
