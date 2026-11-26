'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Logo } from './ui';
import { IJEPA } from '../data/site';

const NAV = [
  { href: '/', label: 'Home', exact: true },
  { href: '/about', label: 'About' },
  { href: '/training', label: 'Training' },
  { href: '/internship', label: 'Internship' },
  // Client request: Research opens the IJEPA journal directly. The research services page
  // (/research) is still linked from the home page and the footer.
  { href: IJEPA.url, label: 'Research', external: true, note: `${IJEPA.label} is our journal for publication` },
  { href: '/patents', label: 'Patents' },
  { href: '/books', label: 'Books' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
];

const Header = ({ topbar, user, profile }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);

  useEffect(() => { setOpen(false); setUserOpen(false); }, [pathname]);
  useEffect(() => {
    if (!userOpen && !open) return undefined;
    const onDown = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') { setUserOpen(false); setOpen(false); } };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [userOpen, open]);

  const isActive = (l) => !l.external && (l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(`${l.href}/`));
  const isAdmin = profile?.role === 'admin';
  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0];
  const home = isAdmin ? '/admin' : '/dashboard';

  return (
    <>
      {topbar?.text && (
        <div className="bg-primary text-primary-foreground">
          <p className="mx-auto max-w-6xl px-4 py-2 text-center text-xs sm:px-6">
            {topbar.pill && <span className="mr-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">{topbar.pill}</span>}
            <span className="opacity-90">{topbar.text}</span>
            {topbar.linkLabel && topbar.link && <> · <Link href={topbar.link} className="font-semibold underline underline-offset-2">{topbar.linkLabel}</Link></>}
          </p>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
            {NAV.map((l) => (l.external ? (
              <span key={l.href} className="group relative">
                <a href={l.href} target="_blank" rel="noreferrer" title={l.note} className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {l.label} <span aria-hidden="true" className="text-xs">↗</span>
                </a>
                <span role="tooltip" className="paper-card pointer-events-none absolute left-1/2 top-8 z-10 w-56 -translate-x-1/2 rounded-lg px-3 py-2 text-center text-xs leading-relaxed text-foreground opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                  <strong className="font-semibold text-primary">{IJEPA.label}</strong> is our journal for publication
                </span>
              </span>
            ) : (
              <Link key={l.href} href={l.href} aria-current={isActive(l) ? 'page' : undefined} className={cn('whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground', isActive(l) && 'font-semibold text-foreground')}>
                {l.label}
              </Link>
            )))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {user ? (
              <div className="relative hidden sm:block" ref={userRef}>
                <button type="button" aria-expanded={userOpen} onClick={() => setUserOpen((v) => !v)} className="inline-flex max-w-[180px] items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                  <span className="truncate" title={user.email}>{firstName}</span>
                  <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', userOpen && 'rotate-180')} />
                </button>
                {userOpen && (
                  <div className="paper-card absolute right-0 top-11 w-56 rounded-xl p-2">
                    <p className="truncate px-3 pb-2 pt-1 text-xs text-muted-foreground">{user.email}</p>
                    <Link href={home} className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">{isAdmin ? 'Admin dashboard' : 'My dashboard'}</Link>
                    {isAdmin && <Link href="/dashboard" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">Student view</Link>}
                    <form action="/auth/signout" method="post"><button type="submit" className="w-full rounded-md px-3 py-2 text-left text-sm text-foreground hover:bg-secondary">Sign out</button></form>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden whitespace-nowrap px-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex">Login</Link>
            )}
            <Link href="/contact" className="hidden whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex">
              Free consultation
            </Link>
            <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border xl:hidden" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-border bg-background px-4 py-3 xl:hidden" aria-label="Mobile">
            <div className="flex flex-col gap-1">
              {NAV.map((l) => (l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                  {l.label} ↗<span className="block text-xs font-normal text-muted-foreground">{l.note}</span>
                </a>
              ) : (
                <Link key={l.href} href={l.href} className={cn('rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary', isActive(l) && 'bg-secondary')}>{l.label}</Link>
              )))}
              <div className="mt-2 flex flex-col gap-1 border-t border-border pt-3">
                <Link href="/contact" className="rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground">Free consultation</Link>
                {user ? (
                  <>
                    <Link href={home} className="rounded-md px-3 py-2 text-sm font-medium text-primary">{isAdmin ? 'Admin dashboard' : 'My dashboard'}</Link>
                    {isAdmin && <Link href="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-primary">Student view</Link>}
                    <form action="/auth/signout" method="post"><button type="submit" className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground">Sign out ({firstName})</button></form>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-primary">Student login</Link>
                    <Link href="/register" className="rounded-md px-3 py-2 text-sm font-medium text-primary">Create an account</Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
