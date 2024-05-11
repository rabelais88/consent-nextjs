'use client';
import { ConsentProvider } from '@consent-nextjs/client';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { PropsWithChildren } from 'react';
const Popup = dynamic(() => import('./Popup'), { ssr: false });

const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConsentProvider
      scriptSlots={
        <>
          <Script
            id="test"
            dangerouslySetInnerHTML={{
              __html: `console.log("script is now running")`,
            }}
          />
          <Script
            id="test2"
            dangerouslySetInnerHTML={{
              __html: `console.log("script is now running")`,
            }}
          />
        </>
      }
    >
      {children}
      <Popup />
    </ConsentProvider>
  );
};

export default ClientProvider;
