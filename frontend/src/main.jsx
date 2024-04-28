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
import store from './store.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
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
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
    
  </React.StrictMode>
)
