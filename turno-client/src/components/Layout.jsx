import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
  return (
    // 1. Added 'flex flex-col' to the main wrapper
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      
      {/* 2. Added 'flex-grow' so this section takes up all available empty space */}
      <main className="flex-grow pb-16 pt-20">
        <Outlet />
      </main>

      {/* 3. Render the Footer right here at the bottom! */}
      <Footer />
    </div>
  );
};

export default Layout;