// Accounts created without a real email (for example "admin") are stored as
// <username>@buildsofttech.local. The login form accepts the bare username.
export const USERNAME_DOMAIN = 'buildsofttech.local';

export const toLoginEmail = (value) => {
  const v = String(value || '').trim().toLowerCase();
  return v.includes('@') ? v : `${v}@${USERNAME_DOMAIN}`;
};
