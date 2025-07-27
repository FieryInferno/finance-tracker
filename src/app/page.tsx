'use client'

import { login } from '@/app/_actions/actions'
import { useActionState } from 'react';

export default function Home() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className="login-container">
      <form className="login-form" action={action}>
        <h2>Login</h2>
        {state?.message && state?.message}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="you@example.com" required name='email' />
        {state?.errors?.email?.map((error, index) => <li className='text-red-600 text-[.8rem]' key={`error-${index}`}>{error}</li>)}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="••••••••" required name='password' />
        <button type="submit">{pending ? 'Loading' : 'Login'}</button>
      </form>
    </div>
  );
}
