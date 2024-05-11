import React, { HTMLAttributes } from 'react';
export interface RefConsentBanner extends HTMLDivElement {}
export interface ConsentBannerProps extends HTMLAttributes<HTMLDivElement> {
  labelConsent?: string;
  children?: React.ReactNode | string;
  areaControl?: React.ReactNode;
}
const defaultMessage = 'default-message';
export const BannerConsent = React.forwardRef<
  RefConsentBanner,
  ConsentBannerProps
>(({ children, labelConsent, areaControl, ...props }, ref) => {
  return (
    <div data-comp="consent-nextjs-banner" ref={ref} {...props}>
      <div className="area-content">{children ?? defaultMessage}</div>
      {areaControl && <div className="area-control">{areaControl}</div>}
    </div>
  );
});
