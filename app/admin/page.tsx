"use client";

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const DecapCMS = dynamic(
  () => import('decap-cms-app').then((mod: any) => mod.default),
  { 
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

export default function AdminPage() {
  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === 'development') {
        const CMS = (await import('decap-cms-app')).default;
        CMS.init();
      }
    })();
  }, []);

  return <div id="nc-root" />;
}