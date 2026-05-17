import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// HomePage Structure
import Layout from './layouts/Layout.jsx';
import ArticlePage from './pages/LandingPages/ArticlePage.jsx';
import HomePage from './pages/LandingPages/HomePage.jsx';
import AboutPage from './pages/LandingPages/AboutPage.jsx';
import ArticleListPage from './pages/LandingPages/ArticleListPage.jsx';

// Auth Structure
import AuthLayout from './layouts/AuthLayout.jsx';
import LoginPage from './pages/AuthPages/Login.jsx';
import SignUpPage from './pages/AuthPages/SignUpPage.jsx';

// Dashboard Structure
import DashLayout from './layouts/DashLayout.jsx';
import DashboardPage from './pages/DashboardPages/DashboardPage.jsx';
import ReportsPage from './pages/DashboardPages/ReportsPage.jsx';
import UsersPage from './pages/DashboardPages/UsersPage.jsx';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage.jsx';

import NotFoundPage from './pages/NotFoundPage.jsx';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/auth/signin" replace />;
  return children;
};

const RequireAdmin = ({ children }) => {
  const type = localStorage.getItem('type');
  if (type !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: 'auth/',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'signin', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  },
  {
    path: 'dashboard/',
    element: (
      <RequireAuth>
        <DashLayout />
      </RequireAuth>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'reports', element: <ReportsPage /> },
      {
        path: 'users',
        element: (
          <RequireAdmin>
            <UsersPage />
          </RequireAdmin>
        ),
      },
      { path: 'articles', element: <DashArticleListPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
