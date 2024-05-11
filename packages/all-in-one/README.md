# consent-nextjs
- Cookie & Data Usage Consent Popup & Hooks for Next.js
- Aims to provide fastest way to setting up consent popup on Next.js

# Install

```
# all in one install
npm i consent-nextjs
# separate install for user's need
npm i @consent-nextjs/client @consent-nexjts/popup @consent-nextjs/lang
```

- `consent-nextjs`: all in one
- `@consent-nextjs/client`: client related hooks
- `@consent-nextjs/popup`: popup UI
- `@consent-nextjs/lang`: languages

# Get Started

```tsx
// --- consent.ts
'use client';
import { initUseConsent } from 'consent-nextjs'
// import { initUseConsent } from '@consent-nextjs/client';

export const { useConsent } = initUseConsent();

// --- components/Popup.tsx
import { enUS } from '@consent-nextjs/lang';
import PopupConsent from '@consent-nextjs/popup';
import { useConsent } from './consent';

const Popup = () => {
  const { consentState, onRejectClick, onConsentClick } = useConsent();
  const showPopup = consentState.consent === 'idle' && consentState.showPopup;

  if (!showPopup) return null;
  return (
    <PopupConsent
      areaTop={<b>{enUS.title}</b>}
      areaBottom={
        <>
          <a href="/privacy" style={{ textAlign: 'center' }}>
            Privacy Policy
          </a>
          <button onClick={() => onConsentClick()}>{enUS.buttonConsent}</button>
          <button onClick={() => onRejectClick()}>{enUS.buttonReject}</button>
        </>
      }
    >
      {enUS.consentGeneral}
    </PopupConsent>
  );
};

export default Popup;

// --- components/ClientProvider.tsx
'use client';
import { ConsentProvider } from 'consent-nextjs';
// import { ConsentProvider } from '@consent-nextjs/client';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { PropsWithChildren } from 'react';
const Popup = dynamic(() => import('./Popup'), { ssr: false });

const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConsentProvider
      scriptSlots={
        {/* scripts are automatically enabled when user consents */}
        <>
          <Script id="google-ga" />
          <Script id="some-ad" />
        </>
      }
    >
      {children}
      <Popup />
    </ConsentProvider>
  );
};

export default ClientProvider;

// --- layout.tsx
// default theme, dark and light
// import '@consent-nextjs/popup/style.css';
import 'consent-nextjs/popup/style.css'
const Layout = () => {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
};
```

# Caveat

- next.js 14 currently has bugs regarding client component. it is encoraged to use nextjs canary version.
