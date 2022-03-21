/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import { PageWrapper } from '../components';
import { useRequest } from '../hooks/useRequest';
import { useGetCode, useGetEmail } from '../hooks/util';
import { getApiEndpoint, isOk } from '../utils/util';
import { COLOR_STYLE, FlexColCenter } from '../styles/GlobalStyles';

function EmailCertPage() {
  const code = useGetCode();
  const email = useGetEmail();
  const endpoint = `${getApiEndpoint()}/auth/modify/verification/${email}/${code}`;
  const { res, request } = useRequest({
    endpoint: endpoint,
    method: 'post',
  });

  useEffect(() => {
    if (code && endpoint) {
      request();
    }
  }, [code, endpoint]);

  const success = useMemo(() => {
    if (res && res.data) {
      if (isOk(res.data.code)) {
        return true;
      }
    }
    return false;
  }, [res]);

  return (
    <PageWrapper>
      <div css={Container}>
        <h2 css={Title}>이메일 인증 페이지</h2>

        {success && (
          <div css={FlexColCenter}>
            <span css={Emoji}>💡</span>
            <p>인증에 성공했습니다!</p>
            <p>회원가입을 계속 진행해주세요.</p>
          </div>
        )}
        {!success && (
          <div css={FlexColCenter}>
            <span css={Emoji}>😢</span>
            <p>인증에 실패했습니다.</p>
            <p>다시 한번 시도해주세요.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default EmailCertPage;

const Container = css`
  ${FlexColCenter}
  position: fixed;
  top: 30%;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 360px;
  max-height: 300px;
  margin: 0 auto;
  transform: translateY(-50%);
  p {
    color: ${COLOR_STYLE.brownishGrey};
    font-size: 15px;
    margin-bottom: 13px;
  }
`;
const Emoji = css`
  margin-bottom: 20px;
  font-size: 45px;
`;
const Title = css`
  font-size: 17px;
  margin-bottom: 25px;
`;
