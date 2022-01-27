/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';

import { isEmail, isURL } from 'validator';
import { isPassword } from '../utils/util';

// [ state ]
// 0. init : 아직 입력 시작하지 않음 -> 에러 띄우지 않음
// 1. empty : 비어있는 상태 -> 에러 메세지 띄우기 시작
// 2. invalid : 조건에 부합하지 않음
// invalid_dup => 중복
// invalid_len_short, invalid_len_high => 길이제한 위반
// invalid_form => 형식위반
// 3. valid : 제출 가능
// * url은 필수는 아님, 안 적으면 `/user_seq`
// 중복체크 필요한 항목: url, nickname
// TODO: 에러 메세지 생성

const postData = (data) => {
  console.log('[submited]');
  console.log(data);
  // fetch(`http://localhost:8080/auth/join/local`, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // }).then((response) => {
  //   console.log(response);
  // });
};

const getFieldList = () => [
  { id: 1, label: '페인팅', name: 'painting' },
  { id: 2, label: '조각', name: 'sculpture' },
  { id: 3, label: '비디오아트', name: 'video_art' },
  { id: 4, label: '디지털아트', name: 'digital_art' },
  { id: 5, label: '현대미술', name: 'modern_art' },
  { id: 6, label: '공예', name: 'crafts' },
  { id: 7, label: '포토그래피', name: 'photography' },
  { id: 8, label: '건축', name: 'architecture' },
];

function JoinPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [field, setField] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [agreement, setAgreement] = useState(false);

  // TODO: 분야선택도 조건에 넣기
  const history = useHistory();
  const fieldList = getFieldList();

  const userSeq = localStorage.getItem('user_seq');
  const passwordState = useMemo(() => {
    // 영문, 숫자, 특수문자
    // 조합: 2가지 이상 혼합 사용
    // 최소 4자 이상
    // console.log('isPassword');
    if (!isPassword(password)) return 'invalid_form';
    else if (password.length === 0) return 'empty';
    else if (password.length < 5) return 'invalid_len_short';
    else return 'valid';
  }, [password]);

  const emailState = useMemo(
    () => (isEmail(email) ? 'valid' : 'invalid'),
    [email]
  );

  const urlState = useMemo(() => {
    // TODO: 중복체크 필요 => 'invalid_dup'
    // invalid char: underscore(_), trailing dot(:), space( )
    const domain = `http://${url}.kr`;
    // console.log(isURL(domain));
    if (url.length === 0) return 'empty';
    else if (!isURL(domain)) return 'invalid_form';
    else if (url.length < 4) return 'invalid_len_short';
    else if (url.length > 20) return 'invalid_len_long';
    else return 'valid';
  }, [url]);

  const fieldState = useMemo(() => {
    if (field.length >= 1) return 'valid';
    else return 'invalid';
  }, [field]);

  const agreementState = useMemo(() => {
    if (agreement) return 'valid';
    else return 'invalid';
  }, [agreement]);

  const nameState = useMemo(() => {
    // TODO: 중복체크 'invalid_dup'
    // 허용: 영문, 한글, 숫자
    // 길이 1-15 -> 8글자 제한은 너무 짧은 것 같음
    if (name.length === 0) return 'empty';
    else if (name.length > 16) return 'invalid_len_long';
    else return 'valid';
  }, [name]);

  const isValid = useCallback((inputState) => inputState === 'valid', []);

  const disableSubmit = useMemo(() => {
    if (
      isValid(agreementState) &&
      isValid(passwordState) &&
      isValid(emailState) &&
      isValid(urlState) &&
      isValid(nameState) &&
      isValid(fieldState)
    ) {
      return false;
    } else return true;
  }, [
    agreementState,
    passwordState,
    fieldState,
    emailState,
    urlState,
    nameState,
  ]);

  // 메세지 업데이트에 사용
  // useEffect(() => {
  //   console.log(`email:  ${email}`);
  // }, [email]);

  // useEffect(() => {
  //   console.log(`name:  ${name}`);
  // }, [name]);

  // useEffect(() => {
  //   console.log(`password:  ${password}`);
  // }, [password]);

  // useEffect(() => {
  //   console.log('field: ');
  //   console.log(field);
  // }, [field]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    postData({
      nickname: name,
      email,
      password,
      url,
      field,
    });
  };

  const onFieldChange = useCallback(
    (target) => {
      if (field.includes(target)) {
        setField(field.filter((item) => item !== target));
      } else {
        setField(field.concat(target));
      }
    },
    [field]
  );

  const fieldButtons = useMemo(
    () =>
      fieldList.map((item) => (
        <button
          type='button'
          key={item.id}
          css={[fieldButton, getColorByState(field, item.id)]}
          onClick={() => onFieldChange(item.id)}
        >
          {item.label}
        </button>
      )),
    [fieldList, field, onFieldChange]
  );

  return (
    <div css={wrapper}>
      <button type='button' onClick={() => history.goBack()}>
        되돌아가기 버튼
      </button>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label css={labelStyle} htmlFor='email'>
          이메일
        </label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <label css={labelStyle} htmlFor='password'>
          비밀번호
        </label>
        <input
          id='password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <button type='button' onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
        </button>
        <p css={guideMessage}>비밀번호 입력 상태 : {passwordState}</p>
        <label css={labelStyle} htmlFor='nickname'>
          닉네임
        </label>
        <input
          id='nickname'
          type='text'
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <label css={labelStyle} htmlFor='url'>
          개인 url
        </label>
        <div css={flexLow}>
          <p
            style={{
              margin: '6px',
            }}
          >
            iamonit.kr/
          </p>
          <input
            id='url'
            type='text'
            value={url}
            onChange={(event) => setUrl(event.currentTarget.value)}
            placeholder={`${userSeq}/`}
          />
        </div>
        <label htmlFor='field'>분야 선택(최소 1개 분야 선택)</label>
        <div>{fieldButtons}</div>
        <div>
          <input
            type='checkbox'
            id='agreement'
            onChange={(event) => setAgreement(event.target.checked)}
          />
          <label css={labelStyle} htmlFor='agreement'>
            약관에 동의합니다.
          </label>
        </div>
        <br />
        <button type='submit' disabled={disableSubmit}>
          생성 완료
        </button>
      </form>
    </div>
  );
}

export default JoinPage;
const clickedButton = css`
  background-color: gray;
  color: white;
`;
const unClickedButton = css`
  background-color: white;
  color: black;
`;

function getColorByState(field, id) {
  if (field.includes(id)) {
    return clickedButton;
  } else {
    return unClickedButton;
  }
}

const fieldButton = css`
  padding: 10px;
  margin: 10px;
  background-color: white;
  &:active {
    background-color: black;
    color: white;
  }
`;

const wrapper = css`
  margin: 30px;

  input:invalid {
    border: 2px solid red;
  }
`;

const labelStyle = css`
  color: gray;
`;

const flexLow = css`
  display: flex;
  flex-direction: row;
`;

const guideMessage = css`
  color: red;
`;
