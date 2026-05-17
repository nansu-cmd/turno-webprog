import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/20';

const actionButtonClassName =
  'w-full rounded-xl py-3.5 text-[11px] font-bold tracking-[0.2em] transition-transform active:scale-[0.98]';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const { data } = await loginUser({ email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('lastName', data.lastName ?? '');
      localStorage.setItem('email', data.email ?? email);
      localStorage.setItem('type', data.type);

      navigate('/dashboard', {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Login failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg">
        <span className="text-xl font-bold">V</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
        Welcome back
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
        Enter your credentials to access the Vongola archives and your personal dashboard.
      </p>

      {error && (
        <div className="mt-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-semibold text-zinc-800">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="signin-password" className="text-sm font-semibold text-zinc-800">
              Password
            </label>
            <button
              type="button"
              className="text-xs font-bold text-orange-600 transition hover:text-orange-500"
            >
              Forgot Password?
            </button>
          </div>
          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            id="remember-me"
            className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-orange-600 focus:ring-orange-500"
          />
          <label htmlFor="remember-me" className="cursor-pointer font-medium text-zinc-600 select-none">
            Keep me logged in
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={submitting}
        >
          {submitting ? 'SIGNING IN…' : 'SIGN IN'}
        </Button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-zinc-200"></div>
          <span className="mx-4 flex-shrink-0 text-xs font-medium uppercase text-zinc-400">
            Or continue with
          </span>
          <div className="flex-grow border-t border-zinc-200"></div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm font-medium text-zinc-600">
        Don't have an account?{' '}
        <Link
          to="/auth/signup"
          className="font-bold text-orange-600 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-500 hover:decoration-orange-500"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
