import React from 'react';

import './styles.scss';

export const CardToggle = () => (
  <div className="card-toggle">
    <svg width="555" height="1569" viewBox="0 0 555 1569" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <path fillRule="evenodd" clipRule="evenodd" d="M555 1529C555 1545.57 541.569 1559 525 1559L78.9999 1559C62.4314 1559 48.9999 1545.57 48.9999 1529L49 365.652C48.4279 347.945 48.2253 328.871 48.2253 310.72C48.2253 276.1 34.7184 258.394 20.1045 242.723C18.6192 241.373 17.2356 239.91 15.9669 238.349L15.2257 237.572C15.2067 237.552 15.222 237.52 15.2494 237.521C15.2753 237.523 15.2911 237.493 15.2753 237.473C10.0881 230.711 7 222.22 7 212.999C7 203.778 10.0881 195.287 15.2754 188.526C15.2911 188.505 15.2754 188.476 15.2495 188.477C15.222 188.479 15.2068 188.446 15.2258 188.426C15.4728 188.167 15.7199 187.909 15.9671 187.65C17.2357 186.088 18.6191 184.626 20.1042 183.275C34.7183 167.605 48.2253 149.898 48.2253 115.279C48.2253 97.1274 48.4279 78.053 49 60.3464L49 -100C49 -116.569 62.4315 -130 79 -130L525 -130C541.569 -130 555 -116.568 555 -100L555 1529Z" fill="white" />
      </g>
      <defs>
        <filter id="filter0_d" x="0" y="-134" width="562" height="1703" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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
