import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "react-query";
import store from './store.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import HomeScreen from './screens/home/HomeScreen.jsx';
import ProductScreen from './screens/product/ProductScreen.jsx';
import CartScreen from './screens/cart/CartScreen.jsx';
import LoginScreen from './screens/auth/LoginScreen.jsx';
import RegisterScreen from './screens/auth/RegisterScreen.jsx';
import ShippingScreen from './screens/checkout/ShippingScreen.jsx';
import PaymentScreen from './screens/checkout/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/checkout/PlaceOrderScreen.jsx';
import OrderScreen from './screens/checkout/OrderScreen.jsx';
import ProfileScreen from './screens/user/ProfileScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductCreateScreen from './screens/admin/ProductCreateScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />}></Route>
      <Route path='/product/:id' element={<ProductScreen />}></Route>
      <Route path='/cart' element={<CartScreen />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>
      <Route path='/register' element={<RegisterScreen />}></Route>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen />}></Route>
        <Route path='/payment' element={<PaymentScreen />}></Route>
        <Route path='/payment' element={<PaymentScreen />}></Route>
        <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>
        <Route path='/order/:id' element={<OrderScreen />}></Route>
        <Route path='/profile' element={<ProfileScreen />}></Route>
      </Route>

      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListScreen />}></Route>
        <Route path='/admin/productlist' element={<ProductListScreen />}></Route>
        <Route path='/admin/product/create' element={<ProductCreateScreen />}></Route>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />}></Route>
        <Route path='/admin/userlist' element={<UserListScreen />}></Route>
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />}></Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </QueryClientProvider>
    </Provider>
    
  </React.StrictMode>
)
