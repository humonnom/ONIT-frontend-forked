/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';

import { isEmail, isURL } from 'validator';
import { isPassword } from '../utils/util';

// [ state ]
// 1. empty : 비어있는 상태 -> 아직 입력 전이므로 가이드 메세지 띄우지 않음
// 2. invalid_{detail} : 조건에 부합하지 않음 -> 가이드 메세지 띄움
//    invalid_dup                           >> 중복
//    invalid_len_short, invalid_len_high   >> 길이제한 위반
//    invalid_form                          >> 형식위반
//    invalid                               >> 그 외 위반사항
// 3. valid : 제출 가능

// [ 특이사항 ]
// url을 제출하지않으면 랜덤 string으로 적용
// 랜덤 string: nanoid 패키지로 생성

// [ TODO ]
// 중복체크 필요한 항목: url, nickname
// 태킴님께 에러메세지 뜨는 순간이 좋을지 여쭤보기, 체크박스
// 분야선택 안해도 가입 시키기!!!

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

// TODO: get field data from server
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
  const [submitTried, setSubmitTried] = useState(false);

  // TODO: 분야선택도 조건에 넣기
  const history = useHistory();
  const fieldList = getFieldList();

  const passwordState = useMemo(() => {
    // 영문, 숫자, 특수문자
    // 조합: 2가지 이상 혼합 사용
    // 최소 4자 이상
    if (password.length === 0) return 'empty';
    else if (!isPassword(password)) return 'invalid_form';
    else if (password.length < 5) return 'invalid_len_short';
    else return 'valid';
  }, [password]);

  const emailState = useMemo(() => {
    if (email === '') return 'empty';
    else return isEmail(email) ? 'valid' : 'invalid';
  }, [email]);

  const urlState = useMemo(() => {
    const formedUrl = `http://${url}.kr`;
    if (url.length === 0) return 'empty';
    // else if (중복체크state) return 'invalid_dup';
    else if (!isURL(formedUrl)) return 'invalid_form';
    else if (url.length < 4) return 'invalid_len_short';
    else if (url.length > 20) return 'invalid_len_long';
    else return 'valid';
  }, [url]);

  const fieldState = useMemo(() => {
    // if (field.length >= 1) return 'valid';
    // else return 'invalid';
    return 'valid';
  }, [field]);

  const agreementState = useMemo(() => {
    if (agreement) return 'valid';
    else return 'invalid';
  }, [agreement]);

  const nameState = useMemo(() => {
    if (name.length === 0) return 'empty';
    // else if (중복체크state) return 'invalid_dup';
    else if (name.length > 15) return 'invalid_len_long';
    else return 'valid';
  }, [name]);

  const isValid = useCallback((inputState) => inputState === 'valid', []);

  const disableSubmit = useMemo(() => {
    if (
      // isValid(agreementState) &&
      // isValid(fieldState) &&
      isValid(passwordState) &&
      isValid(emailState) &&
      isValid(urlState) &&
      isValid(nameState)
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

  const emailGuide = useMemo(() => {
    if (emailState === 'invalid') return '잘못된 이메일 입력값';
    else return '';
  }, [emailState]);
  const passwordGuide = useMemo(() => {
    if (passwordState === 'invalid_form')
      return '영문, 숫자, 특수문자 중 최소 2가지 조합으로 입력해주세요.';
    else if (passwordState === 'invalid_len_short')
      return '5글자 이상 입력해주세요.';
    else return '';
  }, [passwordState]);
  const fieldGuide = useMemo(() => {
    if (fieldState === 'invalid' && submitTried)
      return '관심분야를 하나 이상 선택해주세요.';
    else return '';
  }, [fieldState, submitTried]);
  const nameGuide = useMemo(() => {
    if (nameState === 'invalid_dup') return '이미 사용중인 닉네임입니다.';
    else if (nameState === 'invalid_len_long')
      return '15자 이내로 입력해주세요.';
    else return '';
  }, [nameState]);
  const urlGuide = useMemo(() => {
    if (urlState === 'invalid_form')
      return '언더스코어(_), 콜론(:), 공백문자( ), 슬래시(/)는 사용할 수 없습니다.';
    else if (urlState === 'invalid_len_short')
      return '4글자 이상 입력해주세요.';
    else if (urlState === 'invalid_len_long')
      return '20자 이내로 입력해주세요.';
    else return '';
  }, [urlState]);
  const agreementGuide = useMemo(() => {
    if (agreementState === 'invalid' && submitTried)
      return '약관에 동의해주세요.';
    else return '';
  }, [agreementState, submitTried]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (agreementState === 'invalid') {
      setSubmitTried(true);
    } else {
      postData({
        nickname: name,
        email,
        password,
        url,
        field,
      });
    }
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
    <div>
      <button type='button' onClick={() => history.goBack()}>
        되돌아가기 버튼
      </button>
      <div>
        <form css={[formStyle]} onSubmit={onSubmitHandler}>
          <div css={[inputUnitStyle, emailWrapper]}>
            <label css={labelStyle} htmlFor='email'>
              이메일
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <p css={[guideMessageStyle]}>{emailGuide}</p>
          </div>
          <div css={[inputUnitStyle, passwordWrapper]}>
            <label css={labelStyle} htmlFor='password'>
              비밀번호
            </label>

            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
            </button>
            <p css={[guideMessageStyle]}>{passwordGuide}</p>
          </div>
          <div css={[inputUnitStyle, nameWrapper]}>
            <label css={labelStyle} htmlFor='nickname'>
              닉네임
            </label>
            <input
              id='nickname'
              type='text'
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
            <p css={[guideMessageStyle]}>{nameGuide}</p>
          </div>
          <div css={[inputUnitStyle, urlWrapper]}>
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
                // placeholder={url}
              />
            </div>
            <p css={[guideMessageStyle]}>{urlGuide}</p>
          </div>
          <div css={[inputUnitStyle, fieldWrapper]}>
            <label css={labelStyle} htmlFor='field'>
              분야 선택 (회원가입 후에도 추가할 수 있습니다)
            </label>
            <div>{fieldButtons}</div>
            <p css={[guideMessageStyle]}>{fieldGuide}</p>
          </div>
          <div css={inputUnitStyle}>
            <input
              type='checkbox'
              id='agreement'
              onChange={(event) => setAgreement(event.target.checked)}
            />
            <label htmlFor='agreement'>약관에 동의합니다.</label>
            <p css={[guideMessageStyle]}>{agreementGuide}</p>
          </div>
          <br />
          <button type='submit' disabled={disableSubmit}>
            생성 완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinPage;

const formStyle = css`
  background-color: yellow;
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(50px, auto);
`;

const emailWrapper = css`
  grid-column: 1 / 4;
  grid-row: 1;
`;
const passwordWrapper = css`
  grid-column: 1 / 4;
  grid-row: 2;
`;
const nameWrapper = css`
  grid-column: 1 / 4;
  grid-row: 3;
`;
const urlWrapper = css`
  grid-column: 1 / 4;
  grid-row: 4;
`;
const fieldWrapper = css`
  grid-column: 1 / 4;
  grid-row: 5 / 7;
`;

const inputUnitStyle = css`
  background-color: #e8e8e8;
  padding: 15px 0px;
  margin: 3px 0px;
`;

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
  min-width: 100px;
  background-color: white;
  &:active {
    background-color: black;
    color: white;
  }
`;

const labelStyle = css`
  ${'' /* background-color: red; */}
  color: gray;
`;

const flexLow = css`
  display: flex;
  flex-direction: row;
`;

const guideMessageStyle = css`
  color: red;
  font-size: 12px;
  margin: 5px 0;
`;
