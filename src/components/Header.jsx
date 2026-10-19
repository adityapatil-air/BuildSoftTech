'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const MAIN = [
  { href: '/services/research-publication', label: 'Journal Publication' },
  { href: '/courses', label: 'Software Classes' },
  { href: '/internships', label: 'Internship & Training' },
  { href: '/services/research-collaboration', label: 'Research Collaboration' },
];

const MORE = [
  { href: '/about', label: 'About BuildSoftTech' },
  { href: '/services', label: 'All services' },
  { href: '/services/research-support', label: 'Research support' },
  { href: '/research-areas', label: 'Research areas' },
  { href: '/for-faculty', label: 'For faculty members' },
  { href: '/for-students', label: 'For students' },
  { href: '/for-research-scholars', label: 'For research scholars' },
  { href: '/for-institutions', label: 'For institutions' },
  { href: '/faq', label: 'FAQ' },
];

const Header = ({ user, profile }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const moreRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => { setOpen(false); setMoreOpen(false); setUserOpen(false); }, [pathname]);
  useEffect(() => {
    if (!moreOpen && !userOpen) return undefined;
    const onDown = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') { setMoreOpen(false); setUserOpen(false); } };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [moreOpen, userOpen]);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);
  const moreActive = MORE.some((m) => isActive(m.href));
  const isAdmin = profile?.role === 'admin';
  const firstName = profile?.full_name?.split(' ')[0] || user?.email;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <img src="/logo.png" alt="" width="36" height="36" className="h-9 w-9 rounded-full" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">BuildSoft<span className="text-primary">Tech</span></span>
            <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Publisher of IJEPA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {MAIN.map((l) => (
            <Link key={l.href} href={l.href} className={cn('whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground', isActive(l.href) && 'font-semibold text-foreground')}>
              {l.label}
            </Link>
          ))}
          <div className="relative" ref={moreRef}>
            <button type="button" aria-expanded={moreOpen} onClick={() => setMoreOpen((v) => !v)} className={cn('inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground', moreActive && 'font-semibold text-foreground')}>
              More <ChevronDown className={cn('h-4 w-4 transition-transform', moreOpen && 'rotate-180')} />
            </button>
            {moreOpen && (
              <div className="paper-card absolute right-0 top-8 w-60 rounded-xl p-2">
                {MORE.map((m) => (
                  <Link key={m.href} href={m.href} className={cn('block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary', isActive(m.href) && 'bg-secondary font-semibold')}>{m.label}</Link>
                ))}
              </div>
            )}
          </div>
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
                  <Link href={isAdmin ? '/admin' : '/dashboard'} className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">{isAdmin ? 'Admin dashboard' : 'My dashboard'}</Link>
                  {isAdmin && <Link href="/dashboard" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">Student view</Link>}
                  <form action="/auth/signout" method="post"><button type="submit" className="w-full rounded-md px-3 py-2 text-left text-sm text-foreground hover:bg-secondary">Sign out</button></form>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden whitespace-nowrap px-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex">Login</Link>
          )}
          <Link href="/contact" className="hidden whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex">
            Contact us
          </Link>
          <button aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border xl:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-border bg-background px-4 py-3 xl:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {[...MAIN, ...MORE].map((l) => (
              <Link key={l.href} href={l.href} className={cn('rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary', isActive(l.href) && 'bg-secondary')}>{l.label}</Link>
            ))}
            <div className="mt-2 flex flex-col gap-1 border-t border-border pt-3">
              <Link href="/contact" className="rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground">Contact us</Link>
              {user ? (
                <>
                  <Link href={isAdmin ? '/admin' : '/dashboard'} className="rounded-md px-3 py-2 text-sm font-medium text-primary">{isAdmin ? 'Admin' : 'My dashboard'}</Link>
                  <form action="/auth/signout" method="post"><button type="submit" className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground">Sign out ({firstName})</button></form>
                </>
              ) : (
                <>
                  <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-primary">Login</Link>
                  <Link href="/register" className="rounded-md px-3 py-2 text-sm font-medium text-primary">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
