import { useMemo, useState } from 'react';
import { isEmail, isURL } from 'validator';
import { isPassword } from '../utils/util';

export function useInput({ type }) {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.currentTarget.value);

  const state = useMemo(() => {
    if (value === '') return null;
    if (type === 'email') return isEmail(value) ? 'ok' : '잘못된 형식입니다.';
    else if (type === 'password') {
      if (!isPassword(value))
        return '영문, 숫자, 특수문자 중 최소 2가지 조합으로 입력해주세요.';
      else if (value.length < 5) return '5글자 이상 입력해주세요.';
    } else if (type === 'name') {
      if (value.length > 15) return '15글자 이하로 입력해주세요';
      //   else if (중복체크) return '사용할 수 없는 닉네임 입니다.';
    } else if (type === 'url') {
      const formedUrl = `http://${value}.kr`;
      if (!isURL(formedUrl))
        return '언더스코어(_), 콜론(:), 공백문자( ), 슬래시(/)는 사용할 수 없습니다.';
      else if (value.length < 4) return '4글자 이상 입력해주세요.';
      else if (value.length > 20) return '20글자 이하로 입력해주세요';
      // else if (중복체크) return '사용할 수 없는 url 입니다.';
    }
    return 'ok';
  }, [value]);

  return {
    input: { value, onChange },
    state: state,
  };
}

export default useInput;

// const { Input, state, errMessage, value } = useInput({
// 	state: (str) => {
// 	  if (str === '') {
// 		return 'empty';
// 	  }
// 	},
// 	errMessage: (state) => {
// 	  if (state === 'empty') {
// 		return '입력해주세요';
// 	  }
// 	},
//   });

//   function useInput(init) {
// 	const [value, setValue] = useState(init.state);

// 	const component = (
// 	  <input
// 		value={value}
// 		onChange={(event) => setValue(event.currentTarget.value)}
// 	  />
// 	);

// 	return { Input: component, value };
//   }
