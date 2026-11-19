import React from 'react';
import Link from 'next/link';

const NotFound = () => (
  <div className="pub">
    <section className="hero page-hero">
      <div className="glow3" />
      <div className="wrap">
        <h1>Page not found</h1>
        <p className="lead">The page you are looking for has moved or no longer exists.</p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/">Go to home</Link>
          <Link className="btn btn-ghost" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  </div>
);

export default NotFound;
