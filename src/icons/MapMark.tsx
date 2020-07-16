import * as React from "react";

const SvgMapMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={22} height={26} fill="none" {...props}>
    <g filter="url(#map-mark_svg__filter0_d)">
      <path
        d="M19 11c0 4.418-7 11.5-8 11.5S3 15.418 3 11a8 8 0 1116 0z"
        fill="currentColor"
      />
      <path
        d="M17.5 11c0 .75-.311 1.765-.939 2.966-.613 1.172-1.457 2.388-2.353 3.499a26.415 26.415 0 01-2.552 2.755c-.252.233-.473.421-.656.566a11.753 11.753 0 01-.656-.566 26.423 26.423 0 01-2.552-2.755c-.896-1.111-1.74-2.327-2.353-3.5C4.81 12.766 4.5 11.75 4.5 11a6.5 6.5 0 0113 0zm-6.915 10.077c-.019.01-.015.006.008-.004a.277.277 0 01-.008.004zm.822-.004c.023.01.027.014.008.004a.277.277 0 01-.008-.004z"
        stroke="#fff"
        strokeWidth={3}
      />
    </g>
    <defs>
      <filter
        id="map-mark_svg__filter0_d"
        x={0}
        y={0}
        width={22}
        height={25.5}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={1.5} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default SvgMapMark;
