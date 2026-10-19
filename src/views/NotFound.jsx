import React from 'react';
import Link from 'next/link';

const NotFound = () => (
  <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
    <div className="max-w-md text-center">
      <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
      <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
      <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
      <div className="mt-6 flex justify-center gap-2">
        <Link href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Go home</Link>
        <Link href="/services" className="inline-flex items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">Browse services</Link>
      </div>
    </div>
  </div>
);

export default NotFound;
