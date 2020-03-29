import * as React from 'react';

const SvgPlus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={12} height={12} fill="none" {...props}>
    <path d="M0 6h12M6 0v12" stroke="currentColor" strokeWidth={2} />
  </svg>
);

export default SvgPlus;
