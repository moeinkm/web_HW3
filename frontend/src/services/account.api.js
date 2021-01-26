import request from 'src/services/request';
import { setUaaCookie } from 'src/utils/auth.util';
import history from 'src/history';

export const LoginUrl = () => `/api/v1/account/login/`;
export const postRefreshTokenUrl = () => `/api/v1/account/refresh/`;

export const postLoginService = async (data) => {
  const response = await request.post(LoginUrl(), data);
  if (response.ok) {
    const { token } = response.data.data;

    setUaaCookie(token.access, token.refresh);
    await history.replace('/dashboard');
  }

  return response;
};
