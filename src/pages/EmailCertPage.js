/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import { PageWrapper } from '../components';
import { useRequest } from '../hooks/useRequest';
import { useGetCode } from '../hooks/util';
import { getApiEndpoint, isOk } from '../utils/util';
import { FlexColCenter } from '../styles/GlobalStyles';

function EmailCertPage() {
  const code = useGetCode();
  const endpoint = `${getApiEndpoint()}/auth/modify/verification/${code}`;
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
        {success && <div>인증에 성공했습니다.</div>}
        {!success && <div>인증에 실패했습니다.</div>}
      </div>
    </PageWrapper>
  );
}

export default EmailCertPage;

const Container = css`
  ${FlexColCenter}
  position: fixed;
  background-color: red;
  top: 30%;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 360px;
  max-height: 300px;
  margin: 0 auto;
  transform: translateY(-50%);
`;

const Title = css`
  font-size: 20px;
`;
