import App from '@/App';
import AddBook from '@/pages/AddBook';
import Bookshelf from '@/pages/Bookshelf';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />,
      },
      {
        path: '/user/:id',
        element: <Bookshelf />,
      },
      { path: '/user/:id/add', element: <AddBook /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

export default router;
