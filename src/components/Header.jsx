'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { IJEPA, SITE } from '../data/site';

const SERVICES = [
  { href: '/services/research-publication', label: 'Research Publication (IJEPA)', icon: 'fileText' },
  { href: '/services/research-collaboration', label: 'SCI / Scopus Research Collaboration', icon: 'users' },
  { href: '/services/research-support', label: 'Research Support Services', icon: 'flask' },
  { href: '/internships', label: 'Internship Programs', icon: 'briefcase' },
  { href: '/courses', label: 'Software Training', icon: 'code' },
  { href: '/for-institutions', label: 'Institutional Programs', icon: 'building' },
  { href: '/research-areas', label: 'Research Areas', icon: 'target' },
];

const AUDIENCES = [
  { href: '/for-faculty', label: 'For Faculty Members', icon: 'graduation' },
  { href: '/for-students', label: 'For Students', icon: 'user' },
  { href: '/for-research-scholars', label: 'For Research Scholars', icon: 'bookOpen' },
  { href: '/for-institutions', label: 'For Institutions', icon: 'building' },
];

const NavLink = ({ href, pathname, children, ...rest }) => (
  <Link href={href} className={pathname === href ? 'active' : ''} {...rest}>{children}</Link>
);

const Dropdown = ({ label, items, isOpen, onToggle, onNavigate, pathname }) => {
  const active = items.some((i) => pathname === i.href);
  return (
    <div className={`nav-item ${isOpen ? 'is-open' : ''} ${active ? 'is-active' : ''}`}>
      <button type="button" aria-expanded={isOpen} aria-haspopup="true" onClick={onToggle}>
        {label} <Icon name="chevronDown" size={14} />
      </button>
      <div className="nav-dropdown" role="menu">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''} onClick={onNavigate} role="menuitem">
            <Icon name={item.icon} size={16} /> {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen && !openDropdown) return undefined;
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      setIsMenuOpen(false);
      setOpenDropdown(null);
      menuButtonRef.current?.focus();
    };
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClick);
    };
  }, [isMenuOpen, openDropdown]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };
  const toggle = (key) => setOpenDropdown((cur) => (cur === key ? null : key));

  return (
    <header className="site-header">
      <div className="institutional-bar">
        <div>
          <span>{SITE.tagline}</span>
          <span className="institutional-extra">&nbsp;|&nbsp; Publisher of {IJEPA.name} · ISSN {IJEPA.issn}</span>
        </div>
        <div className="institutional-links">
          <a className="hide-mobile" href={`mailto:${SITE.email}`}><Icon name="mail" size={13} /> {SITE.email}</a>
          <a href={IJEPA.url} target="_blank" rel="noreferrer">{IJEPA.name} Journal <Icon name="arrowUpRight" size={13} /></a>
        </div>
      </div>

      <div className="main-nav-wrap">
        <Link href="/" className="site-brand" onClick={closeMenu}>
          <img src="/logo.png" alt="" width="46" height="46" />
          <span className="brand-wordmark">
            <span className="brand-name">BuildSoftTech</span>
            <span className="brand-tagline">Research · Publication · Training</span>
          </span>
        </Link>
        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-nav"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? 'x' : 'menu'} size={26} />
        </button>
        <nav id="primary-nav" ref={navRef} className={`primary-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <NavLink href="/" pathname={pathname} onClick={closeMenu}>Home</NavLink>
          <NavLink href="/about" pathname={pathname} onClick={closeMenu}>About Us</NavLink>
          <Dropdown label="Services" items={SERVICES} isOpen={openDropdown === 'services'} onToggle={() => toggle('services')} onNavigate={closeMenu} pathname={pathname} />
          <a href={IJEPA.url} target="_blank" rel="noreferrer" onClick={closeMenu}>IJEPA Journal <Icon name="arrowUpRight" size={13} /></a>
          <NavLink href="/internships" pathname={pathname} onClick={closeMenu}>Internships</NavLink>
          <NavLink href="/courses" pathname={pathname} onClick={closeMenu}>Courses</NavLink>
          <Dropdown label="Who We Serve" items={AUDIENCES} isOpen={openDropdown === 'audiences'} onToggle={() => toggle('audiences')} onNavigate={closeMenu} pathname={pathname} />
          <NavLink href="/faq" pathname={pathname} onClick={closeMenu}>FAQ</NavLink>
          <Link href="/contact" className="nav-cta" onClick={closeMenu}>Contact Us</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
