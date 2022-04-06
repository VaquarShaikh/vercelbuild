import React from 'react'
import { Fragment } from 'react'
import { useState  } from 'react';
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData';
import './Search.css'

const Search = () => {

    const [keyword , setKeyword] = useState("");

    let navigate = useNavigate();


    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            // history.push(`/products/${keyword}`);
            navigate(`/products/${keyword}`, { replace: true });
        }else{
            // history.push('/products');
            navigate("/products")
        }
    };

  return <Fragment>
      <MetaData title="Search a product -- ECOMMERCE"/>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
            type="text"
            placeholder="Search a product"
            onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search"/>
      </form>
  </Fragment>
}

export default Search