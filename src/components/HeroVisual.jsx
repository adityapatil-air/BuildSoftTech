import React from 'react';

// Orbit composition echoing the IJEPA hero illustration (globe + satellite nodes + rings),
// drawn in SVG so it inherits the orange/beige palette and needs no raster asset.
const NODES = [
  { cx: 260, cy: 60, label: 'Research', path: 'M-9 -3h18M-9 2h12M-11 -9h22v18h-22z' }, // document
  { cx: 420, cy: 150, label: 'Publication', path: 'M-10 -8h20v16h-20zM-6 -3h12M-6 1h12M-6 5h7' }, // journal
  { cx: 380, cy: 330, label: 'Training', path: 'M-11 -2l11-6 11 6-11 6zM-6 1v6c0 2 3 3 6 3s6-1 6-3V1' }, // graduation
  { cx: 140, cy: 330, label: 'Technology', path: 'M-7 -7h14v14h-14zM-3 -3h6v6h-6zM-7 -10v3M0 -10v3M7 -10v3M-7 7v3M0 7v3M7 7v3' }, // chip
  { cx: 100, cy: 150, label: 'Collaboration', path: 'M-5 -4a3 3 0 1 0 0 .1M5 -4a3 3 0 1 0 0 .1M-11 7c0-4 3-6 6-6s6 2 6 6M-1 7c0-4 3-6 6-6s6 2 6 6' }, // users
];

const HeroVisual = () => (
  <div className="hero-visual" aria-hidden="true">
    <svg viewBox="0 0 520 440" width="520" height="440">
      <defs>
        <radialGradient id="bst-globe" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffd9b0" />
          <stop offset="45%" stopColor="#f08a2e" />
          <stop offset="100%" stopColor="#8a3d10" />
        </radialGradient>
        <radialGradient id="bst-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb470" stopOpacity=".55" />
          <stop offset="100%" stopColor="#ffb470" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bst-ring" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffd9b0" stopOpacity=".1" />
          <stop offset="50%" stopColor="#ffd9b0" stopOpacity=".85" />
          <stop offset="100%" stopColor="#ffd9b0" stopOpacity=".1" />
        </linearGradient>
      </defs>

      {/* soft background grid */}
      <g stroke="#ffd9b0" strokeOpacity=".12" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5].map((i) => <line key={`h${i}`} x1="0" y1={40 + i * 80} x2="520" y2={40 + i * 80} />)}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={`v${i}`} x1={20 + i * 80} y1="0" x2={20 + i * 80} y2="440" />)}
      </g>

      <circle cx="260" cy="220" r="200" fill="url(#bst-glow)" />

      {/* orbit rings */}
      <g className="orbit-ring">
        <ellipse cx="260" cy="220" rx="215" ry="140" fill="none" stroke="url(#bst-ring)" strokeWidth="1.2" transform="rotate(-18 260 220)" />
      </g>
      <g className="orbit-ring is-reverse">
        <ellipse cx="260" cy="220" rx="190" ry="175" fill="none" stroke="#ffd9b0" strokeOpacity=".35" strokeWidth="1" strokeDasharray="4 8" />
      </g>
      <circle cx="260" cy="220" r="150" fill="none" stroke="#ffd9b0" strokeOpacity=".28" strokeWidth="1" />

      {/* connectors to nodes */}
      <g stroke="#ffd9b0" strokeOpacity=".35" strokeWidth="1">
        {NODES.map((n, i) => <line key={i} x1="260" y1="220" x2={n.cx} y2={n.cy} />)}
      </g>

      {/* globe */}
      <circle cx="260" cy="220" r="84" fill="url(#bst-globe)" />
      <g fill="none" stroke="#fff3e4" strokeOpacity=".55" strokeWidth="1.2">
        <ellipse cx="260" cy="220" rx="84" ry="30" />
        <ellipse cx="260" cy="220" rx="84" ry="62" />
        <ellipse cx="260" cy="220" rx="30" ry="84" />
        <ellipse cx="260" cy="220" rx="62" ry="84" />
        <line x1="176" y1="220" x2="344" y2="220" />
        <line x1="260" y1="136" x2="260" y2="304" />
      </g>
      <circle cx="260" cy="220" r="84" fill="none" stroke="#ffe3c4" strokeOpacity=".9" strokeWidth="2" />
      <circle cx="260" cy="220" r="96" fill="none" stroke="#ffd9b0" strokeOpacity=".35" strokeWidth="1" />

      {/* satellite nodes */}
      <g>
        {NODES.map((n, i) => (
          <g key={i} className="orbit-node" transform={`translate(${n.cx} ${n.cy})`}>
            <circle r="40" fill="#5c2d10" fillOpacity=".55" stroke="#ffd9b0" strokeOpacity=".8" strokeWidth="1.5" />
            <circle r="46" fill="none" stroke="#ffd9b0" strokeOpacity=".25" strokeWidth="1" />
            <path d={n.path} fill="none" stroke="#ffe9d2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </g>

      {/* sparks */}
      <g fill="#ffe3c4">
        {[[60, 80], [470, 70], [490, 300], [40, 360], [250, 410], [330, 30]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fillOpacity=".9" />
        ))}
      </g>
    </svg>
  </div>
);

export default HeroVisual;
