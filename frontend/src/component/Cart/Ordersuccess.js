import React from 'react'
import {Link} from 'react-router-dom'
import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './orderSuccess.css'

const Ordersuccess = () => {
  return (
    <div className='orderSuccess'>
        <CheckCircleIcon />

        <Typography>Your order has been placed successfully</Typography>
        <Link to='/orders'>View Orders</Link>
    </div>
  )
}

export default Ordersuccess