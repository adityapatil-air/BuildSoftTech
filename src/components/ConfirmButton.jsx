'use client';

import React from 'react';

// Submit button that asks for confirmation first (deletes, revokes).
const ConfirmButton = ({ message = 'Are you sure?', className = 'button button-light button-small', children, ...rest }) => (
  <button
    type="submit"
    className={className}
    onClick={(e) => { if (!window.confirm(message)) e.preventDefault(); }}
    {...rest}
  >
    {children}
  </button>
);

export default ConfirmButton;
