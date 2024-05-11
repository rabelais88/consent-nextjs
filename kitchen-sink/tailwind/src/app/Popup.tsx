import { enUS } from '@consent-nextjs/lang';
import { BannerConsent, PopupConsent } from '@consent-nextjs/ui';
import { useConsent } from './consent';

const Popup = () => {
  const { consentState, onRejectClick, onConsentClick } = useConsent();
  const showPopup = consentState.consent === 'idle' && consentState.showPopup;

  if (!showPopup) return null;
  return (
    <div data-comp="consent-nextjs-overlay">
      <PopupConsent
        areaTop={<b>{enUS.title}</b>}
        areaBottom={
          <>
            <a href="/privacy" style={{ textAlign: 'center' }}>
              Privacy Policy
            </a>
            <button onClick={() => onConsentClick()}>
              {enUS.buttonConsent}
            </button>
            <button onClick={() => onRejectClick()}>{enUS.buttonReject}</button>
          </>
        }
      >
        {enUS.consentGeneral}
      </PopupConsent>
    </div>
  );
  // return (
  //   <div data-comp="consent-nextjs-overlay">
  //     <BannerConsent
  //       areaControl={
  //         <>
  //           <button onClick={() => onConsentClick()}>
  //             {enUS.buttonConsent}
  //           </button>
  //           <button onClick={() => onRejectClick()}>{enUS.buttonReject}</button>
  //         </>
  //       }
  //     >
  //       {enUS.consentGeneral}
  //     </BannerConsent>
  //   </div>
  // );
};

export default Popup;
