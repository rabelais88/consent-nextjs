'use client';

import { ConsentType } from '@consent-nextjs/client';
import { useConsent } from './consent';

const ClientForm = () => {
  const { consentState, setConsent, setShowPopup } = useConsent();
  return (
    <div>
      <p>
        <b>client form</b>
      </p>
      <p>consent State: {consentState.consent}</p>
      <select
        value={consentState.consent}
        onChange={(ev) => setConsent(ev.target.value as ConsentType)}
      >
        <option value="idle">idle</option>
        <option value="consent">consent</option>
        <option value="reject">reject</option>
      </select>
      <button
        onClick={() => {
          // popup is only visible when consent state is 'idle'
          setConsent('idle');
          setShowPopup(true);
        }}
      >
        show consent popup
      </button>
      <button
        onClick={() => {
          setShowPopup(false);
        }}
      >
        hide consent popup
      </button>
    </div>
  );
};

export default ClientForm;
