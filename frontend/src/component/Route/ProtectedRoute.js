import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate  , Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Loader from '../Loader/Loader'

const ProtectedRoute = ({isAdmin , children }) => {
    const { loading, isAuthenticated  , user} = useSelector((state) => state.user);
  
    


    if (loading) {
      return <Loader />
    }
  
    // if (isAuthenticated) {
    //   return <>{children}</>;
    //   // return <Navigate to="/login" />
    // }

    // console.log(isAuthenticated)
    if(isAuthenticated === false){
      return <Navigate to = '/login' />
    }

   
    if(isAdmin === true && user.role !== 'admin' ){
      return <Navigate to="/login" />
    }

    return <>{children}</>;
    // return <Navigate to="/login" />
};


export default ProtectedRoute