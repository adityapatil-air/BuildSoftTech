'use client';

import React from 'react';

const PrintButton = ({ children = 'Print / save as PDF' }) => (
  <button type="button" onClick={() => window.print()} className="button button-primary">{children}</button>
);

export default PrintButton;
