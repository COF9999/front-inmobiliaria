import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './inmobiliaria/pages/Auth/login.jsx';
import { Register } from './inmobiliaria/pages/Auth/Register.jsx';
import { Home } from './inmobiliaria/pages/home/Home.jsx';
import { ProtectedRoute } from './inmobiliaria/ProtectedRoute.jsx';
import { AuthProvider } from './inmobiliaria/AuthProvider.jsx';
import { RootHome } from './inmobiliaria/pages/home/RootHome.jsx';
import { RootIntegration } from './inmobiliaria/pages/liquidation/RootIntegration.jsx';
import { Integration } from './inmobiliaria/pages/liquidation/Integration.jsx';
import { RootPreliquidateDeal } from './inmobiliaria/pages/preliquidate/RootPreliquidateDeal.jsx';
import { Preliquidate } from './inmobiliaria/pages/preliquidate/Preliquidate.jsx';
import { RootUser } from './inmobiliaria/pages/user/RootUser.jsx';
import { User } from './inmobiliaria/pages/user/User.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootSettings } from './inmobiliaria/pages/settings/rootSettings.jsx';
import { Settings } from './inmobiliaria/pages/settings/settings.jsx';
import { RootFunnelRent } from './inmobiliaria/pages/deals/funnelRent/FunnelRentRoot.jsx';
import { FunnelRent } from './inmobiliaria/pages/deals/funnelRent/FunnelRent.jsx';
import { RootFunnelSale } from './inmobiliaria/pages/deals/funnelsales/FunnelSaleRoot.jsx';
import { FunnelSale } from './inmobiliaria/pages/deals/funnelsales/FunnelSale.jsx';
import { RootDeals } from './inmobiliaria/pages/deals/RootDeals.jsx';
import { DealsHome } from './inmobiliaria/pages/deals/Deals.jsx';
import { DetailFunnelSales } from './inmobiliaria/pages/deals/funnelsales/DetailFunnelSales.jsx';
import { DetailFunnelRent } from './inmobiliaria/pages/deals/funnelRent/DetailFunnelRent.jsx';
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
          {index:true, element: <Home />},
        ]
      }, 

      {
        path: '/integration',
        element: <RootIntegration/>,
        children:[
          {index:true, element: <Integration />},
        ]
      },

      {
        path:'/preliquidate',
        element:<RootPreliquidateDeal/>,
        children:[
          {index:true,element:<Preliquidate/>}
        ]
      },
      {
        path: '/deals',
        element: <RootDeals />,
        children: [
          {
            
            index: true, 
            element: <DealsHome/> 
          },
          {
            path: 'funnel-sale', 
            element: <RootFunnelSale />,
            children: [{ index: true, element: <FunnelSale /> },
              { path: 'detail/:id', element: <DetailFunnelSales /> } 
            ]
          },
          { 
          path: 'funnel-rent', 
          element: <RootFunnelRent />, 
          children: [
            { index: true, element: <FunnelRent /> },
            { path: 'detail/:id', element: <DetailFunnelRent /> } 
          ] 
          }
        ]
      },
      {
        path:"/user",
        element:<RootUser/>,
        children:[
          {index:true,element:<User/>}
        ]
      },
      {
        path:'/settings',
        element:<RootSettings/>,
        children:[
          {index:true,element:<Settings/>}
        ]
      }
    ]
  }
],
{
  basename: '/app'
}
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <QueryClientProvider client={queryClient}>
  //         <AuthProvider>
  //           <RouterProvider router={router} />
  //         </AuthProvider>
  //       </QueryClientProvider>
  // </React.StrictMode>

   <QueryClientProvider client={queryClient}>
           <AuthProvider>
             <RouterProvider router={router} />
           </AuthProvider>
    </QueryClientProvider>
);

