import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './app.css'
import { Login } from './pages/inmobiliaria/Auth/login.jsx';
import { Register } from './pages/inmobiliaria/Auth/Register.jsx';
import { ContainerPublication } from './pages/PublicationFolder/RootPublication.jsx';
import { Publication } from './pages/PublicationFolder/Publication.jsx';
import { Detail } from './pages/PublicationFolder/DetailPublication.jsx';
import { Transaction } from './pages/TransactionFolder/Transaction.jsx';
import {ProtectedRoute} from './pages/ProtectedRoute.jsx';
import { AuthProvider } from './pages/AuthProvider.jsx';

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
        path: '/publications',
        element: <ContainerPublication />,
        children:[
          {
            index:true,
            element: <Publication></Publication>
          },
          {
            path: 'detail/:id',
            element: <Detail></Detail>
          }
        ]
      },  
      {
        path: '/transacciones',
        element: <Transaction></Transaction>
      }
    ]
  }
],
{
  basename: '/app' // Establece el prefijo de las rutas
}
);


// const router = createBrowserRouter(
//   [
//     {
//       path: '/',
//       element: <Login /> // Página principal
//     },
//     {
//       path: '/app/register',
//       element: <Register />
//     },
//     {
//       path: '/app/green-page',
//       element: <StaticGreenPage />
//     },
//     {
//       path: '/app',
//       element: <ProtectedRoute />,
//       children: [
//         {
//           path: 'publications',
//           element: <ContainerPublication />,
//           children: [
//             {
//               index: true,
//               element: <Publication />
//             },
//             {
//               path: 'detail/:id',
//               element: <Detail />
//             }
//           ]
//         },
//         {
//           path: 'my-products',
//           element: <ContainerProduct />,
//           children: [
//             {
//               index: true,
//               element: <Product />
//             },
//             {
//               path: 'create',
//               element: <CreateProduct />
//             }
//           ]
//         },
//         {
//           path: 'my-publications',
//           element: <ContainerMyPublications />,
//           children: [
//             {
//               index: true,
//               element: <MyPublications />
//             },
//             {
//               path: 'detail/:id',
//               element: <DetailMyPublications />
//             }
//           ]
//         },
//         {
//           path: 'my-profile',
//           element: <Profile />
//         },
//         {
//           path: 'offer',
//           element: <Offer />
//         },
//         {
//           path: 'transacciones',
//           element: <Transaction />
//         }
//       ]
//     }
//   ]
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
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