import { Suspense } from 'react';
import AuthForm from '../../components/auth/AuthForm';

export const metadata = { title: 'Create an account', robots: { index: false } };

export default function RegisterPage() {
  return <Suspense fallback={null}><AuthForm mode="register" /></Suspense>;
}
