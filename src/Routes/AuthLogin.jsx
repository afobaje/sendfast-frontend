import React, { useContext } from 'react'
import { Authorized } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AuthLogin({children}) {
    let {authenticated}=useContext(Authorized)
  return (
    
    <>{authenticated?children:<Navigate to='/home' />}</>
  )
}
