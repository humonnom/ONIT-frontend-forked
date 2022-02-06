/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import { isEmail, isURL } from 'validator';
import { css } from '@emotion/react';
import {
  COLOR_STYLE,
  FlexColCenter,
  FlexSpaceBetweenCenter,
  InitButtonStyle,
  SHADOW_STYLE,
} from '../styles/GlobalStyles';
import { isPassword } from '../utils/util';

export function useInput({ inputType, id, type, ...args }) {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.currentTarget.value);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const state = useMemo(() => {
    if (value === '') return null;
    if (inputType === 'email')
      return isEmail(value) ? 'ok' : '잘못된 형식입니다.';
    else if (inputType === 'password') {
      if (!isPassword(value))
        return '영문, 숫자, 특수문자 중 최소 2가지 조합으로 입력해주세요.';
      else if (value.length < 5) return '5글자 이상 입력해주세요.';
    } else if (inputType === 'name') {
      if (value.length > 15) return '15글자 이하로 입력해주세요';
      //   else if (중복체크) return '사용할 수 없는 닉네임 입니다.';
    } else if (inputType === 'url') {
      const formedUrl = `http://${value}.kr`;
      if (!isURL(formedUrl))
        return '언더스코어(_), 콜론(:), 공백문자( ), 슬래시(/)는 사용할 수 없습니다.';
      else if (value.length < 4) return '4글자 이상 입력해주세요.';
      else if (value.length > 20) return '20글자 이하로 입력해주세요';
      // else if (중복체크) return '사용할 수 없는 url 입니다.';
    }
    return 'ok';
  }, [value]);

  const input = () => {
    if (inputType === 'url')
      return (
        <div css={InputUrl}>
          {args.prefix}
          <input id={id} type={type} value={value} onChange={onChange} />
        </div>
      );
    else if (inputType === 'password')
      return (
        <div css={InputPassword}>
          <input id={id} type={type} value={value} onChange={onChange} />
          {args.button}
        </div>
      );
    else
      return (
        <div css={InputNormal}>
          <input id={id} type={type} value={value} onChange={onChange} />
        </div>
      );
  };

  return {
    value,
    state,
    component: (
      <div css={InputContainer}>
        <div css={InputStyle}>{input()}</div>
        <div css={ErrorMessageWrapper}>
          <div css={ErrorMessageStyle}>
            <p>{state === 'ok' ? '' : state}</p>
          </div>
        </div>
      </div>
    ),
  };
}

export default useInput;

const InputContainer = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

const InputStyle = css`
  width: 100%;
  padding: 1.1vh 0vw;
  background-color: ${COLOR_STYLE.white};
  border-radius: 30px;
  box-shadow: ${SHADOW_STYLE.pale};
  ${FlexColCenter}
  input {
    background-color: inherit;
    width: 100%;
    border: 0;
  }
`;

const InputNormal = css`
  width: 90%;
`;
const InputUrl = css`
  ${FlexSpaceBetweenCenter}
  width: 90%;
  font-weight: bold;
  color: ${COLOR_STYLE.brownishGrey};
  font-size: 0.9rem;
  input {
    margin-left: 0.5vw;
  }
`;

const InputPassword = css`
  width: 90%;
  ${FlexSpaceBetweenCenter}
  button {
    ${InitButtonStyle}
    width: 7vw;
    font-size: 0.8rem;
    color: ${COLOR_STYLE.brownishGrey};
  }
`;

const ErrorMessageWrapper = css`
  display: flex;
  justify-content: end;
  align-items: start;
  width: 100%;
  height: 3.5vh;
`;

const ErrorMessageStyle = css`
  display: flex;
  margin: 1.2vh 1vw 0vh 1vw;

  p {
    font-size: 0.8rem;
    color: ${COLOR_STYLE.coral};
  }
`;
