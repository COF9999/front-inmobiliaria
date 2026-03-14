import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './inmobiliaria/pages/Auth/login.jsx';
import { Register } from './inmobiliaria/pages/Auth/Register.jsx';
import { Home } from './inmobiliaria/pages/home/Home.jsx';
import { ProtectedRoute } from './inmobiliaria/ProtectedRoute.jsx';
import { AuthProvider } from './inmobiliaria/AuthProvider.jsx';
import { RootHome } from './inmobiliaria/pages/home/RootHome.jsx';
import { RootLiquidation } from './inmobiliaria/pages/liquidation/RootLiquidation.jsx';
import { Liquidation } from './inmobiliaria/pages/liquidation/Liquidation.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './app.css'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },

  {
    path: '/register',
    element:<Register></Register>
  },

  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <RootHome />,
        children:[
          // {index:true, element: <Publication />},
          {index:true, element: <Home />},
          // {path: 'detail/:id', element: <Detail />}
        ]
      }, 


      {
        path: '/liquidation',
        element: <RootLiquidation />,
        children:[
          // {index:true, element: <Publication />},
          {index:true, element: <Liquidation />},
          // {path: 'detail/:id', element: <Detail />}
        ]
      }
    ]
  }
],
{
  basename: '/app' // Establece el prefijo de las rutas
}
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

