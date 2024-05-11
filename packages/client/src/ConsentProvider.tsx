import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  getClientCookie,
  getClientCookies,
  removeClientCookies,
  setClientCookie,
} from './cookie';
export type ConsentType = 'idle' | 'consent' | 'reject';
export type ConsentState = {
  consent: ConsentType;
  showPopup: boolean;
};
export interface ConsentProviderProps extends React.PropsWithChildren {
  showPopupDefault?: boolean;
  initConsentState?: () => ConsentType;
  consentCookieKey?: string;
  scriptSlots?: React.ReactNode | React.ReactNode[];
}
export const ConsentContext = React.createContext<ConsentState>(null);
export const ConsentDispatchContext = React.createContext(null);

export const ConsentProvider = ({
  children,
  initConsentState,
  showPopupDefault = true,
  consentCookieKey = 'consent',
  scriptSlots,
}: ConsentProviderProps) => {
  const [consentState, setConsentState] = useState<ConsentState>({
    consent: 'idle',
    showPopup: false,
  });
  useEffect(() => {
    const rawCookie = initConsentState
      ? initConsentState()
      : getClientCookie(consentCookieKey);
    const consentDefault = ['idle', 'consent', 'reject'].includes(rawCookie)
      ? rawCookie
      : 'idle';
    if (consentDefault !== consentCookieKey) {
      const cookieKeys = Object.keys(getClientCookies()).filter(
        (ck) => ck !== consentCookieKey
      );
      removeClientCookies(...cookieKeys);
    }
    setConsentState({
      consent: consentDefault as ConsentType,
      showPopup: showPopupDefault,
    });
  }, []);

  return (
    <ConsentContext.Provider value={consentState}>
      <ConsentDispatchContext.Provider value={setConsentState}>
        {consentState.consent === 'consent' && scriptSlots}
        {children}
      </ConsentDispatchContext.Provider>
    </ConsentContext.Provider>
  );
};

type SaveConsentFunction = (consent: ConsentType) => void;
export const initUseConsent = ({
  saveConsent,
  consentCookieKey = 'consent',
}: {
  saveConsent?: SaveConsentFunction;
  consentCookieKey?: string;
} = {}) => {
  const _saveConsent = (consent: ConsentType) => {
    if (saveConsent) {
      saveConsent(consent);
      return;
    }
    setClientCookie({
      [consentCookieKey]: consent,
      expires: new Date('2025-01-01').toUTCString(),
      path: '/',
    });
  };

  const useConsent = () => {
    const consentState = useContext(ConsentContext);
    const setConsentStateInternal = useContext(ConsentDispatchContext);
    const setConsent = (consent: ConsentType) => {
      setConsentStateInternal({ ...consentState, consent });
      _saveConsent(consent);
    };
    const setShowPopup = (show: boolean) => {
      setConsentStateInternal({ ...consentState, showPopup: show });
    };
    const onConsentClick = () => {
      setConsentStateInternal({ consent: 'consent', showPopup: false });
      _saveConsent('consent');
    };
    const onRejectClick = () => {
      setConsentStateInternal({ consent: 'reject', showPopup: false });
      _saveConsent('reject');
    };
    return {
      consentState,
      setConsent,
      setShowPopup,
      onConsentClick,
      onRejectClick,
    };
  };

  return { useConsent };
};
