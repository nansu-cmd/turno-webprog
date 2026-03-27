import { NavLink, Link } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full px-6 py-3 text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-300',
    isActive
      ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20 scale-105'
      : 'text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-6 py-3 sm:px-8 lg:px-12">
        
        <Link to="/" className="group flex items-center gap-5 transition-transform hover:scale-102">
          
          <div className="relative h-16 w-16 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-zinc-900 transition-colors duration-300 group-hover:bg-orange-600 shadow-xl" />
            
            <svg 
              viewBox="0 0 24 24" 
              className="absolute inset-0 h-full w-full p-2.5 transition-transform group-hover:rotate-6" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" 
                stroke="white" 
                strokeWidth="1.8"
              />
              <path 
                d="M12 7V17M9.2 9.2L14.8 14.8M14.8 9.2L9.2 14.8" 
                stroke="white" 
                strokeWidth="1.2" 
                strokeOpacity="0.4"
              />
              
              <path 
                d="M6 11C4.5 11 3 12 3 12C3 12 4.5 13 6 13" 
                stroke="white" 
                strokeWidth="1.8" 
                strokeLinecap="round"
              />
              <path 
                d="M18 11C19.5 11 21 12 21 12C21 12 19.5 13 18 13" 
                stroke="white" 
                strokeWidth="1.8" 
                strokeLinecap="round"
              />
              
              <path 
                d="M12 5C11.5 5.5 11 6.5 11 7H13C13 6.5 12.5 5.5 12 5Z" 
                fill="white" 
                className="opacity-90"
              />
            </svg>
          </div>

          <span className="text-2xl font-black tracking-tighter text-zinc-900 uppercase">
            The Winged Clam
          </span>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;