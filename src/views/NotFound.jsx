import React from 'react';
import { ButtonLink, PageHero } from '../components/ui';

const NotFound = () => (
  <PageHero
    eyebrow="404"
    title="Page not found"
    intro="The page you are looking for has moved or no longer exists."
    actions={<><ButtonLink href="/" variant="accent">Go to home</ButtonLink><ButtonLink href="/contact" variant="outline-light">Contact us</ButtonLink></>}
  />
);

export default NotFound;
