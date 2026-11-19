'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Menu, Phone, X } from 'lucide-react';
import { Logo } from './ui';

const NAV = [
  { href: '/', label: 'Home', exact: true },
  { href: '/about', label: 'About' },
  { href: '/training', label: 'Training' },
  { href: '/internship', label: 'Internship' },
  { href: '/research', label: 'Research' },
  { href: '/patents', label: 'Patents' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
];

const Header = ({ contact, topbar, user, profile }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (l) => (l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(`${l.href}/`));
  const isAdmin = profile?.role === 'admin';
  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0];
  const home = isAdmin ? '/admin' : '/dashboard';

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="group">
            {contact.phoneDisplay && <span className="item"><Phone width={14} height={14} aria-hidden="true" /><a href={`tel:${contact.phoneLink}`}>{contact.phoneDisplay}</a></span>}
            {contact.email && <span className="item"><Mail width={14} height={14} aria-hidden="true" /><a href={`mailto:${contact.email}`}>{contact.email}</a></span>}
          </div>
          <div className="group">
            {topbar?.text && (
              <span className="item">
                {topbar.pill && <span className="pill">{topbar.pill}</span>}
                {topbar.text}
                {topbar.linkLabel && topbar.link && <> &ndash; <Link href={topbar.link}><b>{topbar.linkLabel}</b></Link></>}
              </span>
            )}
            {topbar?.text && <span className="sep acct" aria-hidden="true">|</span>}
            {user
              ? (
                <span className="item acct">
                  <Link href={home}>{isAdmin ? 'Admin' : 'My dashboard'} ({firstName})</Link>
                  <form action="/auth/signout" method="post"><button type="submit">Sign out</button></form>
                </span>
              )
              : <span className="item acct"><Link href="/login">Student login</Link></span>}
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="wrap">
          <Logo />
          <button type="button" className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((v) => !v)}>
            {open ? <X width={26} height={26} /> : <Menu width={26} height={26} />}
          </button>
          <nav id="main-nav" className={`nav${open ? ' open' : ''}`} aria-label="Main">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className={isActive(l) ? 'active' : undefined} aria-current={isActive(l) ? 'page' : undefined}>{l.label}</Link>
            ))}
            <Link className="btn btn-primary" href="/contact">Free Consultation</Link>
            <div className="nav-account">
              {user ? (
                <>
                  <Link href={home}>{isAdmin ? 'Admin dashboard' : 'My dashboard'}</Link>
                  {isAdmin && <Link href="/dashboard">Student view</Link>}
                  <form action="/auth/signout" method="post"><button type="submit">Sign out ({firstName})</button></form>
                </>
              ) : (
                <>
                  <Link href="/login">Student login</Link>
                  <Link href="/register">Create an account</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
