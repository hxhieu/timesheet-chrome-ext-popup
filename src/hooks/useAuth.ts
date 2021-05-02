import { useState } from 'react';
import { useEnv } from './useEnv';

const getAuthCookie = (): Promise<chrome.cookies.Cookie | null> =>
  new Promise((resolve) => {
    const { timesheetUrl: url, authCookie: name } = useEnv();
    chrome.cookies.get(
      {
        url,
        name,
      },
      (cookie) => {
        resolve(cookie);
      },
    );
  });

const useAuth = (): [auth: boolean, busy: boolean] => {
  const [auth, setAuth] = useState(false);
  const [busy, setBusy] = useState(true);

  getAuthCookie()
    .then((cookie) => {
      setAuth(!!cookie && !!cookie.value);
    })
    .finally(() => {
      setBusy(false);
    });

  return [auth, busy];
};

export { useAuth };
