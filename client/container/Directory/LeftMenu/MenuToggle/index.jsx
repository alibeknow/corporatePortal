import React from 'react';

import './styles.scss';

export const MenuToggle = () => (
  <div className="left-menu-toggle">
    <svg width="51" height="1605" viewBox="0 0 51 1605" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <path fillRule="evenodd" clipRule="evenodd" d="M-358 1631C-358 1647.57 -344.569 1661 -328 1661L-27.9999 1661C-11.4314 1661 2.00006 1647.57 2.00006 1631L2.00001 467.652C2.57209 449.945 2.77473 430.871 2.77473 412.72C2.77472 378.1 16.2816 360.394 30.8955 344.723C32.3809 343.373 33.7644 341.91 35.0331 340.349L35.7743 339.572C35.7932 339.552 35.778 339.52 35.7506 339.521C35.7247 339.523 35.7089 339.493 35.7247 339.473C40.9119 332.711 44 324.22 44 314.999C44 305.778 40.9119 297.287 35.7246 290.526C35.7089 290.505 35.7246 290.476 35.7505 290.477C35.778 290.479 35.7932 290.446 35.7743 290.426C35.5272 290.167 35.28 289.909 35.0329 289.65C33.7643 288.088 32.3809 286.626 30.8958 285.275C16.2818 269.605 2.77472 251.898 2.77472 217.279C2.77472 199.127 2.57208 180.053 2 162.346L1.99999 1.99998C1.99999 -14.5686 -11.4315 -28 -28 -28L-328 -28C-344.569 -28 -358 -14.5685 -358 2L-358 1631Z" fill="white" />
      </g>
      <defs>
        <filter id="filter0_d" x="-365" y="-32" width="416" height="1703" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow" />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.372795 0 0 0 0 0.413481 0 0 0 0 0.454167 0 0 0 0.21 0" />
          <feBlend mode="multiply" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  </div>
);
