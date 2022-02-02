/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';

import { isEmail, isURL } from 'validator';
import { isPassword } from '../utils/util';
import {
  COLOR_STYLE,
  FlexColCenter,
  FlexColSpaceAroundStart,
  FlexSpaceAroundCenter,
  FlexSpaceBetweenCenter,
  FlexSpaceBetweenStart,
} from '../styles/GlobalStyles';

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
  // { id: 2, label: '조각', name: 'sculpture' },
  // { id: 3, label: '비디오아트', name: 'video_art' },
  // { id: 4, label: '디지털아트', name: 'digital_art' },
  // { id: 5, label: '현대미술', name: 'modern_art' },
  // { id: 6, label: '공예', name: 'crafts' },
  // { id: 7, label: '포토그래피', name: 'photography' },
  // { id: 8, label: '건축', name: 'architecture' },
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
  // const fieldGuide = useMemo(() => {
  //   if (fieldState === 'invalid' && submitTried)
  //     return '관심분야를 하나 이상 선택해주세요.';
  //   else return '';
  // }, [fieldState, submitTried]);
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
    <div css={Wrapper}>
      <div css={Container}>
        <div css={PageInfos}>
          <div>
            <button type='button' onClick={() => history.goBack()}>
              되돌아가기 버튼
            </button>
            <span>
              새 계정 생성을 위한 <wbr />
              정보를 입력해
              <wbr />
              주세요.
            </span>
          </div>
          <h2>Onit</h2>
        </div>
        <form css={[InputList]} onSubmit={onSubmitHandler}>
          <div css={[InputItem]} id='narrow'>
            <label htmlFor='email'>이메일</label>
            <div css={InputItemContents}>
              <div css={Content}>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </div>
              <p>{emailGuide}</p>
            </div>
          </div>
          <div css={[InputItem]} id='narrow'>
            <label htmlFor='password'>비밀번호</label>
            <div css={InputItemContents}>
              <div css={Content}>
                <div id='passwordDiv'>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                  <button
                    id='showPasswordBtn'
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
                  </button>
                </div>
              </div>

              <p>{passwordGuide}</p>
            </div>
          </div>
          <div css={[InputItem]} id='narrow'>
            <label htmlFor='nickname'>닉네임</label>
            <div css={InputItemContents}>
              <div css={Content}>
                <input
                  id='nickname'
                  type='text'
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                />
              </div>
              <p>{nameGuide}</p>
            </div>
          </div>
          <div css={[InputItem]} id='narrow'>
            <label htmlFor='url'>개인 url</label>
            <div css={InputItemContents}>
              <div css={Content}>
                <div id='urlDiv'>
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
              </div>
              <p>{urlGuide}</p>
            </div>
          </div>
          <div css={[InputItem]} id='wide'>
            <label htmlFor='field'>분야 선택</label>
            <div css={InputItemContents}>
              <div css={Content}>{fieldButtons}</div>
              {/* <p>{fieldGuide}</p> */}
            </div>
          </div>
          <div css={InputConfirm}>
            <input
              type='checkbox'
              id='agreement'
              onChange={(event) => setAgreement(event.target.checked)}
            />
            <label htmlFor='agreement'>약관에 동의합니다.</label>

            <p>{agreementGuide}</p>
            <button type='submit' disabled={disableSubmit}>
              생성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinPage;

const FocusedButton = css`
  background-color: ${COLOR_STYLE.orange};
  color: ${COLOR_STYLE.black};
`;
const NormalButton = css`
  background-color: ${COLOR_STYLE.white};
  color: ${COLOR_STYLE.grey};
`;

function getColorByState(field, id) {
  if (field.includes(id)) {
    return FocusedButton;
  } else {
    return NormalButton;
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

const Wrapper = css`
  width: 100vw;
  height: 100vh;
`;

const Container = css`
  width: 100vw;
  height: 100vh;
  ${FlexSpaceBetweenCenter}
`;

const PageInfos = css`
  height: 100vh;
  width: 35vw;
  margin: 5vw;
  ${FlexColSpaceAroundStart}
  div {
    ${FlexColSpaceAroundStart}
    height: 20vh;
    button {
    }
    span {
      width: 12vw;
      font-size: 1.4rem;
      word-break: keep-all;
      margin-top: 1vh;
    }
  }
`;

const InputList = css`
  ${FlexColCenter}
  background-color: ${COLOR_STYLE.lightGrey};
  height: 100vh;
  width: 65vw;
  border-radius: 70px 0px 0px 70px;
  #narrow {
    height: 7vh;
  }
  #wide {
    height: 20vh;
  }
`;

const InputItem = css`
  ${FlexSpaceBetweenStart}
  margin: 10px;
  width: 100%;
  height: 100%;
  label {
    font-weight: bold;
    font-size: 1rem;
    width: 15vw;
  }
`;

const InputItemContents = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  ${'' /* border: 0.1rem solid; */}

  > p {
    font-size: 0.8rem;
    color: ${COLOR_STYLE.redOrange};
  }

  > div {
    background-color: ${COLOR_STYLE.white};
  }
`;

const Content = css`
  width: 100%;
  height: 50%;

  input {
    background-color: inherit;
    width: 100%;
    border: 0;
    outline: 0;
  }
  #showPasswordBtn {
    background-color: inherit;
    border: 0;
    outline: 0;
  }
  div {
    display: flex;
    align-items: center;
  }
  #urlDiv p {
    color: ${COLOR_STYLE.grey};
    font-weight: blod;
  }
  #passwordDiv button {
    width: 12vw;
    padding: 0;
    word-break: keep-all;
  }
`;

const InputConfirm = css`
  ${FlexSpaceAroundCenter}
  width: 100%;
  height: 10%;
  p {
    font-size: 0.8rem;
  }
  button {
    padding: 20px;
  }
`;
