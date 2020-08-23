import dynamic from 'next/dynamic';

export * from './utils';
export const ConfigurationConstructorFields = dynamic(() => import('./ConfigurationConstructorFields'), {
  ssr: false,
});
