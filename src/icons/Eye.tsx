import * as React from "react";

const SvgEye = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={20} height={14} fill="none" {...props}>
    <path
      d="M19.152 4.975a1.473 1.473 0 010 2.05C17.776 8.488 14.726 11 10 11 5.274 11 2.223 8.488.848 7.025a1.473 1.473 0 010-2.05C2.223 3.512 5.274 1 10 1c4.726 0 7.776 2.512 9.152 3.975z"
      stroke="currentColor"
      strokeWidth={0.733}
    />
    <path
      d="M12.967 6c0 1.419-1.291 2.633-2.967 2.633C8.324 8.633 7.033 7.42 7.033 6S8.324 3.367 10 3.367c1.676 0 2.967 1.214 2.967 2.633z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.733}
    />
  </svg>
);

export default SvgEye;
