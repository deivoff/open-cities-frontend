import * as React from "react";

const SvgArrowTop = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={9} height={9} fill="none" {...props}>
    <path
      d="M4.146.646a.5.5 0 01.708 0l3.182 3.182a.5.5 0 11-.708.708L4.5 1.707 1.672 4.536a.5.5 0 11-.708-.708L4.146.646zM4 9V1h1v8H4z"
      fill="currentColor"
    />
  </svg>
);

export default SvgArrowTop;
