import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';
import logo from '../assets/logo.png';
import { IJEPA, SITE } from '../data/site';

const SERVICES = [
  { to: '/services/research-publication', label: 'Research Publication (IJEPA)', icon: 'fileText' },
  { to: '/services/research-collaboration', label: 'SCI / Scopus Research Collaboration', icon: 'users' },
  { to: '/services/research-support', label: 'Research Support Services', icon: 'flask' },
  { to: '/internships', label: 'Internship Programs', icon: 'briefcase' },
  { to: '/courses', label: 'Software Training', icon: 'code' },
  { to: '/for-institutions', label: 'Institutional Programs', icon: 'building' },
  { to: '/research-areas', label: 'Research Areas', icon: 'target' },
];

const AUDIENCES = [
  { to: '/for-faculty', label: 'For Faculty Members', icon: 'graduation' },
  { to: '/for-students', label: 'For Students', icon: 'user' },
  { to: '/for-research-scholars', label: 'For Research Scholars', icon: 'bookOpen' },
  { to: '/for-institutions', label: 'For Institutions', icon: 'building' },
];

const Dropdown = ({ label, items, isOpen, onToggle, onNavigate, pathname }) => {
  const active = items.some((i) => pathname === i.to);
  return (
    <div className={`nav-item ${isOpen ? 'is-open' : ''} ${active ? 'is-active' : ''}`}>
      <button type="button" aria-expanded={isOpen} aria-haspopup="true" onClick={onToggle}>
        {label} <Icon name="chevronDown" size={14} />
      </button>
      <div className="nav-dropdown" role="menu">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={onNavigate} role="menuitem">
            <Icon name={item.icon} size={16} /> {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

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
        <Link to="/" className="site-brand" onClick={closeMenu}>
          <img src={logo} alt="" width="46" height="46" />
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
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
          <Dropdown label="Services" items={SERVICES} isOpen={openDropdown === 'services'} onToggle={() => toggle('services')} onNavigate={closeMenu} pathname={location.pathname} />
          <a href={IJEPA.url} target="_blank" rel="noreferrer" onClick={closeMenu}>IJEPA Journal <Icon name="arrowUpRight" size={13} /></a>
          <NavLink to="/internships" onClick={closeMenu}>Internships</NavLink>
          <NavLink to="/courses" onClick={closeMenu}>Courses</NavLink>
          <Dropdown label="Who We Serve" items={AUDIENCES} isOpen={openDropdown === 'audiences'} onToggle={() => toggle('audiences')} onNavigate={closeMenu} pathname={location.pathname} />
          <NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          <Link to="/enquire" className="nav-cta" onClick={closeMenu}>Register / Enquire</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
