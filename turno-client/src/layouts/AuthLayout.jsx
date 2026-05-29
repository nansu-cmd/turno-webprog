import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full grid-cols-2">
        
        <div className="relative border-r border-zinc-200 bg-zinc-900">
          
          <img
            src="https://i.pinimg.com/1200x/53/6f/e1/536fe10f27de7fa99c056ed9f993d44d.jpg" 
            alt="Network Background"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/90 via-zinc-900/40 to-transparent" />
          
        </div>

        <main className="flex items-center justify-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>

      </div>
    </section>
  );
};

export default AuthLayout;