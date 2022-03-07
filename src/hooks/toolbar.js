import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementModalAction } from '../redux/slice';

export function useSetPopUpModal() {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  const setDispatch = useCallback(
    (state, type) => {
      dispatch(
        createReplacementModalAction({
          ...modal,
          popUpWindow: state,
          popUpWindowType: type,
        })
      );
    },
    [modal]
  );

  const turnOn = useCallback(
    (type) => {
      setDispatch(true, type);
    },
    [setDispatch]
  );
  const turnOff = useCallback(
    (type) => {
      setDispatch(false, type);
    },
    [setDispatch]
  );

  return {
    turnOn,
    turnOff,
  };
}
export function useSetToolbar(id) {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));
  const dispatch = useDispatch();
  const useSetDispatch = useCallback(
    (newState) => {
      console.log(id);
      dispatch(
        createReplacementModalAction({
          ...modal,
          imgInputWindow: newState,
          imgChangeTargetId: id,
        })
      );
    },
    [modal]
  );
  const open = useCallback(() => {
    useSetDispatch(true);
  }, [useSetDispatch]);

  const close = useCallback(() => {
    useSetDispatch(false);
  }, [useSetDispatch]);

  return { open, close };
}
