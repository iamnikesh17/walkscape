import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
export const AdminRoutes = ({children}) => {
    const {userInfo}=useSelector((state)=>state.auth);

  return userInfo.isAdmin?children:<Navigate to="/"/> 
}
