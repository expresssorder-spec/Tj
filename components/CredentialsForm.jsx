import React from 'react';
import { UserIcon, LockIcon } from './Icons.jsx';

export const CredentialsForm = ({ email, setEmail, password, setPassword, errors }) => {
  const emailError = errors?.email;
  const passwordError = errors?.password;

  return (
    <form className="space-y-6" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          اسم المستخدم أو الإيميل
        </label>
        <div className="relative">
           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
             <UserIcon />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className={`w-full bg-slate-700/50 border text-slate-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:ring-2 transition ${
              emailError 
                ? 'border-red-500/60 focus:ring-red-500 focus:border-red-500' 
                : 'border-slate-600 focus:ring-blue-400 focus:border-blue-400'
            }`}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
        </div>
        {emailError && <p id="email-error" className="text-red-400 text-sm mt-2" role="alert">{emailError}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
          كلمة السر
        </label>
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <LockIcon />
            </div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full bg-slate-700/50 border text-slate-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:ring-2 transition ${
              passwordError 
                ? 'border-red-500/60 focus:ring-red-500 focus:border-red-500' 
                : 'border-slate-600 focus:ring-blue-400 focus:border-blue-400'
            }`}
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? 'password-error' : undefined}
          />
        </div>
        {passwordError && <p id="password-error" className="text-red-400 text-sm mt-2" role="alert">{passwordError}</p>}
      </div>
    </form>
  );
};