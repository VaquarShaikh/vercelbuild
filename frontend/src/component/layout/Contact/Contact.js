import { Button } from '@mui/material'
import React from 'react'
import './contact.css'

const Contact = () => {
  return (
    <div className='contactContainer'>
        <a className='mailBtn' href="mailto:vaquar7113@gmail.com">
          <Button>
          Contact: vaquar7113@gmail.com
              </Button>  
        </a>
    </div>
  )
}

export default Contact