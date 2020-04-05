import * as React from "react";

const SvgEyeHidden = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={20} height={14} fill="none" {...props}>
    <path fill="currentColor" d="M14.918 0l.598.5L4.598 13.53 4 13.03z" />
    <path
      d="M12.803 1.31A12.601 12.601 0 0010 1C5.274 1 2.223 3.512.848 4.975a1.475 1.475 0 00.001 2.051c.819.87 2.23 2.111 4.233 2.974m10.053-7.904a12.885 12.885 0 014.017 2.878 1.474 1.474 0 010 2.05C17.776 8.489 14.726 11 10 11c-.768 0-1.492-.066-2.172-.184"
      stroke="currentColor"
      strokeWidth={0.733}
    />
    <path
      d="M12.967 6c0 1.418-1.29 2.632-2.965 2.633l2.881-3.257c.055.2.084.41.084.624zM7.033 6c0-1.419 1.291-2.633 2.967-2.633.23 0 .454.023.669.067l-3.26 3.85A2.393 2.393 0 017.034 6z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.733}
    />
  </svg>
);

export default SvgEyeHidden;
