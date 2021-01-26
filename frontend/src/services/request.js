import { create } from 'apisauce';
import { message, notification } from 'antd';
import { cookies, getCookie, setUaaCookie } from 'src/utils/auth.util';
import { postRefreshTokenUrl } from './account.api';

const baseURL =
  process.env.REACT_PUBLIC_BASE_URL;

// create main request configs
const request = (() => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'fa',
    origin: baseURL,
  };

  // eslint-disable-next-line no-underscore-dangle
  const _api = create({
    baseURL,
    headers,
  });

  return _api;
})();

export function logOutOnTokenExpired() {
    request.setHeader('Authorization', '');
    cookies.remove('access_token');
    global.window.location.replace('/');
}

request.addRequestTransform(req => {
  // eslint-disable-next-line no-underscore-dangle
  const _token =
    getCookie('access_token');
  if (_token) {
    req.headers.Authorization = `${_token}`;
  }
});

/*
 * hanlde unexpected error here.
 * access token expire every 30 minute.
 * if access token expire we get an 401 error on api requests.
 * here we get new access token with referesh token and update it.
 * if referesh token expired too, user whould redirect to login page.
 */
request.axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // if refresh request status is 401 redirect to login
    if (error.config.url.includes('api/v1/account/refresh')) {
      logOutOnTokenExpired();
      return Promise.reject(error);
    }


    const refresh = getCookie('refresh_token');

    const originalRequest = error.config;

    const newToken = await request.post(
      postRefreshTokenUrl(),
      {
        refresh,
      },
    );
    if (newToken.ok) {
      // set header and cookie with new access token
      setUaaCookie(newToken.data.data.access, refresh);

      // retry original request
      originalRequest.headers.Authorization = `${newToken.data.data.access}`;
      const newData = await request.axiosInstance.request(originalRequest);
      return newData;
    }
    return error;
  },
);

// for show notification on errors.
export const requestMonitor = (response) => {
  const originalMessage = response?.originalError?.response?.data?.message;
  const dict = {
    CLIENT_ERROR: 'خطا در عملیات',
    SERVER_ERROR: 'خطای سرور',
    TIMEOUT_ERROR: 'خطای سرور',
    CONNECTION_ERROR: 'خطای سرور',
    NETWORK_ERROR: 'خطای سرور',
    CANCEL_ERROR: 'لغو عملیات',
    UNKNOWN_ERROR: 'خطای ناشناخته',
  };
    console.log('response',response);
  message.config({ maxCount: 20 });
  const messages = (originalMessage &&
    (typeof originalMessage === 'string'
      ? [originalMessage]
      : Object.keys(originalMessage).map(
          item => originalMessage[item][0],
        ))) || [dict[response.problem]];
    if (response.ok && response.status === 201) {
        notification['success']({
            message: 'تغییرات با موفقیت ذخیره شد.',
        });
    }
  if (!response.ok) {
    // for check whether refresh token has expired or not
    if (response.status === 401) {
      logOutOnTokenExpired();
    } else {
      messages.forEach(key => {
        message.warning({ content: key, duration: 5 });
      });
    }
  }
};

export default request;
export {
  baseURL,
};
