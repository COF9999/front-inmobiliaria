import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './app.css'
import { Login } from './pages/Auth/login.jsx';
import { Register } from './pages/Auth/Register.jsx';
import { ContainerPublication } from './pages/PublicationFolder/RootPublication.jsx';
import { Publication } from './pages/PublicationFolder/Publication.jsx';
import { Detail } from './pages/PublicationFolder/DetailPublication.jsx';
import { ContainerMyPublications } from './pages/MyPublicationFolder/RootMyPublications.jsx';
import { MyPublications } from './pages/MyPublicationFolder/MyPublications.jsx';
import { DetailMyPublications } from './pages/MyPublicationFolder/DetailMyPublications.jsx';
import { ContainerProduct } from './pages/ProductFolder/RootProduct.jsx';
import { CreateProduct } from './pages/ProductFolder/CreateProduct.jsx';
import { Product } from './pages/ProductFolder/Products.jsx';
import { Offer } from './pages/OfferFolder/Offer.jsx';
import { Transaction } from './pages/TransactionFolder/Transaction.jsx';
import { StaticGreenPage } from './pages/greenPage.jsx';
import { Profile } from './pages/MyProfile/MyProfile.jsx';
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
    path: '/green-page',
    element:<StaticGreenPage></StaticGreenPage>
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
        path: '/my-products',
        element: <ContainerProduct></ContainerProduct>,
        children:[
          {
            index:true,
            element: <Product></Product>
          },
          {
            path:'create',
            element: <CreateProduct></CreateProduct>
          },
        ]
      },
      {
        path: '/my-publications',
        element: <ContainerMyPublications></ContainerMyPublications>,
        children:[
          {
            index:true,
            element: <MyPublications></MyPublications>
          },
          {
            path:'detail/:id',
            element: <DetailMyPublications></DetailMyPublications>
          },
        ]
      },
      {
        path: '/my-profile',
        element: <Profile></Profile>
      },
      {
        path: '/offer',
        element: <Offer></Offer>
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