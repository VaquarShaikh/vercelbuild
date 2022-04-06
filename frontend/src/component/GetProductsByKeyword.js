import React from 'react'
import { useParams } from 'react-router-dom'

const GetProductsByKeyword = () => {
    const keyword = useParams();
    console.log(keyword)
  return <div>sdfsf</div>
}

export default GetProductsByKeyword