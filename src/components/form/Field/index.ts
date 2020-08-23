import dynamic from 'next/dynamic';

export const Select = dynamic(() => import('./Select'));
export * from './Input';
export * from './TextArea';
