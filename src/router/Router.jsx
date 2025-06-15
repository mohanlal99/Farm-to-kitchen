import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn';
import PrivateRoute from '../context/PrivateRoute';
import About from '../pages/About';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct'
import Market from '../pages/Market';
import ConsumerPrivateRoute from '../context/ConsumerPrivateRoute';

const Home = lazy(() => import('../pages/Home'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Register = lazy(() => import('../pages/Register'));
const ConsumerCart = lazy(() => import('../pages/ConsumerCart'));


const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path='/about' element={<About />} />
      <Route path='/products' element={<PrivateRoute><Products /></PrivateRoute>} />
      <Route path='/dashboard' element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path='/market' element={<PrivateRoute><Market /></PrivateRoute>} />
      <Route path='/cart' element={<PrivateRoute><ConsumerPrivateRoute><ConsumerCart /></ConsumerPrivateRoute></PrivateRoute>} />
      <Route path='/add-product' element={<PrivateRoute><AddProduct /></PrivateRoute>} />
      <Route path='/register' element={<Register />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router
