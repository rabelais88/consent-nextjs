import React, { HTMLAttributes } from 'react';
export interface RefConsentPopup extends HTMLDivElement {}
export interface ConsentPopupProps extends HTMLAttributes<HTMLDivElement> {
  labelConsent?: string;
  children?: React.ReactNode | string;
  areaTop?: React.ReactNode;
  areaBottom?: React.ReactNode;
}
const defaultMessage = 'default-message';
export const PopupConsent = React.forwardRef<
  RefConsentPopup,
  ConsentPopupProps
>(({ children, labelConsent, areaTop, areaBottom, ...props }, ref) => {
  return (
    <div data-comp="consent-nextjs-popup" ref={ref} {...props}>
      {areaTop && <div className="area-top">{areaTop}</div>}
      <div className="area-content">{children ?? defaultMessage}</div>
      {areaBottom && <div className="area-bottom">{areaBottom}</div>}
    </div>
  );
});
