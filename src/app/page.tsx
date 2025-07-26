'use client'

import { login } from '@/app/actions'
import { useActionState } from 'react';

export default function Home() {
  const [state, action, pending] = useActionState(login, undefined)
  return (
    <div className="login-container">
      <form className="login-form" action={action}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="you@example.com" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="••••••••" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
