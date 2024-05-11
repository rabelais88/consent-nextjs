const parseCookieString = (cookieString: string) => {
  const reCookieParse = /([^;=]+)=([^;=]+)(?:; |;|$)/g;
  const cookies = cookieString.matchAll(reCookieParse);
  const parsedObj = Array.from(cookies).reduce(
    (ac, currentValue) => {
      const fullMatch = currentValue?.[0];
      const key = currentValue?.[1];
      const value = currentValue?.[2];
      if (!key || typeof value !== 'string') {
        throw Error(`cookie parsing error for string: ${fullMatch}`);
      }
      return { ...ac, [key]: value };
    },
    {} as Record<string, string>
  );
  return parsedObj;
};

const serializeCookieObj = (cookieObj: Record<string, string>) => {
  return `${Object.entries(cookieObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')}; `;
};

export const getClientCookies = () => {
  if (!window) return '';
  return parseCookieString(document.cookie);
};

export const getClientCookie = (key: string) => {
  if (!window) return '';
  return getClientCookies()[key];
};

export const setClientCookie = (cookieObj: Record<string, string>) => {
  document.cookie = serializeCookieObj(cookieObj);
};

export const removeClientCookies = (...key: string[]) => {
  if (!window) return;
  const emptyKeys = key.reduce((ac, cv) => ({ ...ac, [cv]: '' }), {});
  setClientCookie({
    ...emptyKeys,
    path: '/',
    expires: 'Thu, 01 Jan 1970 00:00:01 GMT',
  });
};
