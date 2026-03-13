import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './app.css'
import { Login } from './pages/inmobiliaria/Auth/login.jsx';
import { Register } from './pages/inmobiliaria/Auth/Register.jsx';
import { Home } from './pages/inmobiliaria/pagesInmobiliaria/Home.jsx';
import { Transaction } from './pages/TransactionFolder/Transaction.jsx';
import {ProtectedRoute} from './pages/ProtectedRoute.jsx';
import { AuthProvider } from './pages/AuthProvider.jsx';
import { RootHome } from './pages/inmobiliaria/home/RootHome.jsx';
import { RootLiquidation } from './pages/inmobiliaria/liquidation/RootLiquidation.jsx';
import { Liquidation } from './pages/inmobiliaria/liquidation/Liquidation.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      }, 

      {
        path: '/transacciones',
        element: <Transaction/>
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


// <BrowserRouter>
   
//    <Routes>
//        <Route path='/' element={<Login></Login>}></Route>
//        <Route path='/publications' element={<Publication></Publication>}></Route>
//        <Route path='/my-products' element={<Product></Product>}></Route>
//        <Route path='/green-page' element={<StaticGreenPage></StaticGreenPage>}></Route>
//        <Route path='*' element={<Error></Error>}></Route>
//    </Routes>
//  </BrowserRouter>