import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white transition-transform group-hover:scale-105">
              <span className="font-bold">V</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-zinc-900">
              The Winged Clam
            </span>
          </Link>

          <div className="hidden md:flex gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-zinc-900 ${isActive('/') ? 'text-zinc-900' : 'text-zinc-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-zinc-900 ${isActive('/about') ? 'text-zinc-900' : 'text-zinc-500'}`}
            >
              About
            </Link>
            <Link 
              to="/articles" 
              className={`text-sm font-medium transition-colors hover:text-zinc-900 ${isActive('/articles') ? 'text-zinc-900' : 'text-zinc-500'}`}
            >
              Archives
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            to="/auth/signin" 
            className="hidden text-sm font-semibold text-zinc-600 transition hover:text-zinc-900 sm:block"
          >
            Log In
          </Link>
          <Link 
            to="/auth/signup" 
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;  