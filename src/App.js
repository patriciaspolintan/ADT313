import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import Register from './pages/Public/Register/Register';
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/List/List';
import Form from './pages/Main/Movie/Form/Form';
import CastForm from './pages/Main/Movie/Form/Cast/CastForm';
// import Cast from './pages/Main/Movie/Cast/Cast'; // Import the Cast component

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main/movies',
        element: <Movie />,
        children: [
          {
            path: '/main/movies',
            element: <Lists />,
          },
          {
            path: '/main/movies/form/:movieId?',
            element: <Form />,
            children: [
              {
                path: 'cast-and-crews',
                element: <h1>Cast Placeholder</h1>, // Placeholder for Cast
              },
              {
                path: 'photos',
                element: <h1>Photos Placeholder</h1>, // Placeholder for Photos
              },
              {
                path: 'videos',
                element: <h1>Videos Placeholder</h1>, // Placeholder for Videos
              },
            ],
          },
        ],
      },
    ],
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
