import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/20';

const actionButtonClassName =
  'w-full rounded-xl py-3.5 text-[11px] font-bold tracking-[0.2em] transition-transform active:scale-[0.98]';

const blank = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  address: '',
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(blank);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      await createUser({
        ...form,
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        type: 'editor',
        isActive: true,
      });
      setSuccess('Account created. Redirecting to sign in…');
      setTimeout(() => navigate('/auth/signin'), 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Sign up failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg">
        <span className="text-xl font-bold">V</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
        Join the Famiglia
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
        Create your account to gain full access to our network, archives, and community.
      </p>

      {error && (
        <div className="mt-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-6 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {success}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSignUp}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-semibold text-zinc-800">
              First Name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              placeholder="Giotto"
              autoComplete="given-name"
              className={inputClasses}
              value={form.firstName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-zinc-800">
              Last Name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Vongola"
              autoComplete="family-name"
              className={inputClasses}
              value={form.lastName}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-semibold text-zinc-800">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="1"
              placeholder="25"
              className={inputClasses}
              value={form.age}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-sm font-semibold text-zinc-800">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className={inputClasses}
              value={form.gender}
              onChange={onChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact" className="text-sm font-semibold text-zinc-800">
              Contact Number
            </label>
            <input
              id="contact"
              name="contactNumber"
              type="text"
              placeholder="09xxxxxxxxx"
              className={inputClasses}
              value={form.contactNumber}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="text-sm font-semibold text-zinc-800">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="giottoV"
              autoComplete="username"
              className={inputClasses}
              value={form.username}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-800">
            Email Address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            className={inputClasses}
            value={form.email}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-semibold text-zinc-800">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Sampaloc, Manila"
            className={inputClasses}
            value={form.address}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-800">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClasses}
            value={form.password}
            onChange={onChange}
            required
            minLength={8}
          />
          <p className="mt-2 text-xs font-medium text-zinc-500">
            Must be at least 8 characters with numbers and symbols.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={`${actionButtonClassName} mt-4`}
          disabled={submitting}
        >
          {submitting ? 'CREATING…' : 'CREATE ACCOUNT'}
        </Button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-zinc-200"></div>
          <span className="mx-4 flex-shrink-0 text-xs font-medium uppercase text-zinc-400">
            Or sign up with
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
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-bold text-orange-600 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-500 hover:decoration-orange-500"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
