import './App.css';
import Header from './component/layout/Header/Header.js';
import WebFont from 'webfontloader'
import React from 'react';
import Footer from './component/layout/Footer/Footer.js'
import { Outlet } from 'react-router-dom';
import Home from './component/Home/Home.js'
import store from './store'
import { loadUser } from './actions/userAction'
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState , useEffect } from 'react';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import {Provider} from 'react-redux'
import Loader from './component/Loader/Loader';
import {positions , transitions , Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import GetProductsByKeyword from './component/GetProductsByKeyword.js'
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile.js'
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js'
import Cart from './component/Cart/Cart.js'
import Shipping from './component/Cart/Shipping.js'
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import Payment from './component/Cart/Payment.js'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/Ordersuccess.js'
import MyOrders from './component/Order/MyOrders.js'
import OrderDetails from './component/Order/OrderDetails.js'
import Dashboard from './component/admin/Dashboard.js'
import Sidebar from './component/admin/Sidebar'
import ProductList from './component/admin/Productlist.js'
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct.js'
import OrderList from './component/admin/OrderList.js'
import ProcessOrder from './component/admin/ProcessOrder.js'
import UsersList from './component/admin/UsersList.js'
import UpdateUser from './component/admin/UpdateUser.js'
import ProductReviews from './component/admin/ProductReviews.js'
import About from './component/layout/About/About';
import Contact from './component/layout/Contact/Contact'
import NotFound from "./component/layout/Not Found/NotFound.js";




function App() {
    const {isAuthenticated , user } = useSelector(state=>state.user)
  //   const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    // getStripeApiKey();
  }, []);
    // console.log('stripeApiKey : ' + stripeApiKey)

    window.addEventListener('contextmenu' , (e) => e.preventDefault())

    const stripeapikey = loadStripe('pk_test_51KeviGSC74m43ybFFdEhIo3XrUaDoc6bizWKmzN6Nmp3TxNtKGW9Warwmj8zHbXWGVN88evIG2zlUNE9dki0I43D00HncRHnZ2')
 return (
    <Router>
        <Header/>
        {/* <Sidebar/> */}
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
            <Route path = '/' element = {<Home/>} />
            <Route path = '/product/:id' element={<ProductDetails/>} />
         <Route path = '/products' element = {<Products/>} />
         <Route path = '/search' element = {<Search/>} />
         <Route path = '/products/:keyword' element = {<Products/>} />
         <Route path = '/login' element = {<LoginSignUp/>}/>
         <Route path = '/about' element = {<About/>}/>
         <Route path = '/contact' element = {<Contact/>}/>
         <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
        />;
        <Route
          path='/me/update'
          element={
            <ProtectedRoute>
              <UpdateProfile/>
            </ProtectedRoute>          
          }
          />
        <Route
          path='/password/update'
          element={
            <ProtectedRoute>
              <UpdatePassword/>
            </ProtectedRoute>          
          }
          />
        <Route
          path='/shipping'
          element={
            <ProtectedRoute>
              <Shipping/>
            </ProtectedRoute>          
          }
          />
        <Route
          path='/order/confirm'
          element={
            <ProtectedRoute>
              <ConfirmOrder/>
            </ProtectedRoute>          
          }
          />
        <Route
          path='/success'
          element={
            <ProtectedRoute>
              <OrderSuccess/>
            </ProtectedRoute>          
          }
          />
        <Route
          path='/orders'
          element={
            <ProtectedRoute>
              <MyOrders/>
            </ProtectedRoute>          
          }
          />
        <Route
          path='/order/:id'
          element={
            <ProtectedRoute>
              <OrderDetails/>
            </ProtectedRoute>          
          }
          />
        <Route
          path='/admin/dashboard'
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard/>
            </ProtectedRoute>          
          }
          />
        <Route
          path='/admin/products'
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList/>
            </ProtectedRoute>          
          }
          />
        
        <Route
          path='/admin/product/new'
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct/>
            </ProtectedRoute>          
          }
          />
        
        
        <Route
          path='/admin/product/:id'
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct/>
            </ProtectedRoute>          
          }
          />
        
        
        <Route
          path='/admin/orders'
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList/>
            </ProtectedRoute>          
          }
          />
        
        
        <Route
          path='/admin/order/:id'
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder/>
            </ProtectedRoute>          
          }
          />
        
        
        <Route
          path='/admin/users'
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList/>
            </ProtectedRoute>          
          }
          />
        
        
        <Route
          path='/admin/user/:id'
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser/>
            </ProtectedRoute>          
          }
          />
        
        
        <Route
          path='/admin/reviews'
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews/>
            </ProtectedRoute>          
          }
          />


          {stripeapikey && (
              <Route
              path='/process/payment'
              element={
                  <Elements stripe={stripeapikey} >
                  <ProtectedRoute>
                  <Payment/>
                  </ProtectedRoute>          
                  </Elements>
                }
          />
          )}
        <Route path = '/password/forgot' element = {<ForgotPassword/>} />
        <Route path = '/password/reset/:token' element = {<ResetPassword/>} />
        <Route path = '/cart' element={<Cart/>} />
        <Route path = '*' element = {<NotFound/>} />
        </Routes>
        <Footer/>
    </Router>


 );
}

export default App;
