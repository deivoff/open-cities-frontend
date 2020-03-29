import * as React from 'react';

const SvgEye = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={19}
    height={12}
    fill="none"
    {...props}
  >
    <path
      d="M18.633 6c0 1.487-.954 2.886-2.611 3.933-1.652 1.043-3.957 1.7-6.522 1.7-2.565 0-4.87-.657-6.522-1.7C1.322 8.886.367 7.487.367 6c0-1.487.955-2.886 2.611-3.933C4.63 1.024 6.935.367 9.5.367c2.565 0 4.87.657 6.522 1.7C17.679 3.114 18.633 4.513 18.633 6z"
      stroke="currentColor"
      strokeWidth={0.733}
    />
    <circle cx={9.5} cy={6} r={3.5} fill="currentColor" />
  </svg>
);

export default SvgEye;
