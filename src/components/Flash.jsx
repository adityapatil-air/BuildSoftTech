import React from 'react';

// Shows the one-line notice that server actions pass back in ?ok= / ?error=.
const Flash = ({ searchParams }) => {
  const ok = searchParams?.ok;
  const error = searchParams?.error;
  if (!ok && !error) return null;
  return (
    <div role="status" className={`admin-alert ${error ? 'is-error' : 'is-ok'}`}>
      {String(error || ok).slice(0, 300)}
    </div>
  );
};

export default Flash;
