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
        {state?.errors.email?.map((error) => <li className='text-red-600 text-[.8rem]'>{error}</li>)}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="••••••••" required />
        <button type="submit">{pending ? 'Loading' : 'Login'}</button>
      </form>
    </div>
  );
}
