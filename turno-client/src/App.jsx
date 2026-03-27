import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// HomePage Structure
import Layout from './assets/components/Layout.jsx';
import ArticlePage from './assets/pages/ArticlePage.jsx';
import HomePage from './assets/pages/HomePage.jsx';
import AboutPage from './assets/pages/AboutPage.jsx';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticlePage />,
      },
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
