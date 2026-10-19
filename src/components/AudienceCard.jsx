'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';

// Photo card for the "Who we serve" row. If the remote photo fails to load the card falls
// back to a plain tinted block with the icon, so the row never shows a broken image.
const AudienceCard = ({ href, photo, alt, icon, title, sub, text }) => {
  const [failed, setFailed] = useState(false);
  return (
    <Link href={href} className="audience-card">
      <div className={`audience-photo ${failed ? 'is-fallback' : ''}`}>
        {!failed && photo ? (
          <img src={photo} alt={alt || ''} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <Icon name={icon} size={34} />
        )}
      </div>
      <div className="audience-body">
        <strong>{title}</strong>
        <span>{sub}</span>
        <small>{text}</small>
      </div>
    </Link>
  );
};

export default AudienceCard;
