import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="page-body">
      <div className="site-container">
        <div className="page-card" role="alert">
          <p className="eyebrow accent">Error 404</p>
          <h1 style={{ margin: '0 0 8px', color: 'var(--brown)' }}>Page not found</h1>
          <p>The page you were looking for does not exist or has moved.</p>
          <div className="row-actions">
            <Link href="/" className="button button-primary button-small">Go to the home page</Link>
            <Link href="/services" className="button button-light button-small">Browse services</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
