import React from 'react';
import { UserIcon, LockIcon } from './Icons.tsx';

interface CredentialsFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export const CredentialsForm: React.FC<CredentialsFormProps> = ({ email, setEmail, password, setPassword }) => {
  return (
    <form className="space-y-6">
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
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
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
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
      </div>
    </form>
  );
};