'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../Icon';

const ITEMS = [
  { href: '/admin', label: 'Site settings', icon: 'edit', exact: true },
  { href: '/admin/courses', label: 'Courses', icon: 'book' },
  { href: '/admin/internships', label: 'Internships', icon: 'briefcase' },
  { href: '/admin/students', label: 'Students', icon: 'users' },
];

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <nav>
      {ITEMS.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link key={it.href} href={it.href} className={active ? 'is-active' : ''}>
            <Icon name={it.icon} size={16} /> {it.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminNav;
