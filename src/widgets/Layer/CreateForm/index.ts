import dynamic from 'next/dynamic';

export { default as CreateLayer } from './CreateFormContainer';
export const CreateForm = dynamic(() => import('./CreateForm'), {
  ssr: false,
});
