import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/10';

const actionButtonClassName = 'w-full rounded-xl py-3.5 text-[11px] font-bold tracking-[0.2em] transition-transform active:scale-[0.98]';

const SignUpPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
        Join the Famiglia
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
        Create your account to gain full access to our network, archives, and community.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-semibold text-zinc-800">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Giotto"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-zinc-800">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Vongola"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-800">
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-800">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs font-medium text-zinc-500">
            Must be at least 8 characters with numbers and symbols.
          </p>
        </div>

        <Button type="submit" variant="primary" className={`${actionButtonClassName} mt-2`}>
          CREATE ACCOUNT
        </Button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-zinc-200"></div>
          <span className="mx-4 flex-shrink-0 text-xs font-medium uppercase text-zinc-400">Or sign up with</span>
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

      <div className="mt-8 text-center text-sm text-zinc-600">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-bold text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-900"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;