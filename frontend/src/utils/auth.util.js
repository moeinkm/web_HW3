import Cookies from 'universal-cookie';
import request from "src/services/request";

export const cookies = new Cookies();

export const universalAtob = (b64Encoded) => {
  try {
    return atob(b64Encoded);
  } catch (err) {
    return Buffer.from(b64Encoded, 'base64').toString();
  }
};

// export const GetTokenExpireTime = (token) => {
//   const hash = token.split('.');
//   const result = JSON.parse(universalAtob(hash[1]) as string).exp;
//   return new Date(result * 1000);
// };

export const setCookie = (name, value, params) => {
  const defaultParams = { path: '/' };
  cookies.set(name, value, { ...defaultParams, ...params });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};

/**
 * Set user authentication and authorization cookies and headers.
 * @param access
 * @param refresh
 */
export const setUaaCookie = (access) => {
  setCookie('access_token', access);
  request.setHeader('Authorization', access);
};
