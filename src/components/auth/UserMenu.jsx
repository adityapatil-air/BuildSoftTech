import React from 'react';
import Link from 'next/link';

// Header slot: Login / Register for visitors, name + dashboard + sign out for users.
const UserMenu = ({ user, profile, compact = false }) => {
  if (!user) {
    return (
      <>
        <Link href="/login" className={compact ? '' : 'nav-login'}>Login</Link>
        <Link href="/register" className="nav-cta">Register</Link>
      </>
    );
  }
  const name = profile?.full_name?.split(' ')[0] || user.email;
  const isAdmin = profile?.role === 'admin';
  return (
    <>
      <Link href={isAdmin ? '/admin' : '/dashboard'} className="nav-cta">{isAdmin ? 'Admin' : 'My dashboard'}</Link>
      <form action="/auth/signout" method="post" className="nav-signout">
        <span title={user.email}>{name}</span>
        <button type="submit">Sign out</button>
      </form>
    </>
  );
};

export default UserMenu;
