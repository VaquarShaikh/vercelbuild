import React , {Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './productReviews.css'
import {useSelector , useDispatch} from 'react-redux'
import {
    clearErrors,
    getAllReviews,
    deleteReviews,
} from '../../actions/productAction'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';




const ProductReviews = () => {

    // let navigate = useNavigate()

    let navigate = useNavigate()

    const dispatch = useDispatch()

    const alert = useAlert()

    // const {error : deleteError , isDeleted } = useSelector((state) => state.review)
    const {error : deleteError , isDeleted} = useSelector((state) => state.review)

    const { error , reviews , loading } = useSelector(
        (state) => state.productReviews
    )

    const [productId, setProductId] = useState('')

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId , productId))
    }

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(getAllReviews(productId))
    }

    useEffect(() => {

        if(productId.length === 24){
          dispatch(getAllReviews(productId))
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('Review Deleted Successfully ')
            navigate('/admin/reviews' , {replace:true})
            dispatch({type : DELETE_REVIEW_RESET })
        }

        // dispatch(getAdminProduct())
    } , [dispatch , alert , error , deleteError , navigate , isDeleted , productId])

    const columns = [
        {field : 'id' , headerName : 'Product ID' , minWidth: 200 , flex:0.5},
        
        {
          field:'user',
          headerName:'User',
          minWidth:200, 
          flex: 0.6,
        },
        {
          field:'comment',
          headerName:'Comment',
          minWidth:350, 
          flex: 1,
        },
        {
            field:'rating',
            headerName:'Rating',
            type:'number',
            minWidth:180, 
            flex: 0.4,
            cellClassName: (params) => {
              return params.getValue(params.id , 'rating') >= 3 ? 'greenColor' : 'redColor'
          }
        },
        {
            field:'actions',
            headerName:'Actions',
            flex: 0.3,
            minWidth:150 , 
            type:'number',
            sortable:false , 
            renderCell:(params) => {
                return (
                <Fragment>
                    <Button onClick={() => deleteReviewHandler(params.getValue(params.id , 'id'))}>
                        <DeleteIcon/>
                    </Button>

                </Fragment>
                )
            }
        },

    ]

    const rows = []

    reviews && 
        reviews.forEach((item) => {
            rows.push({
                id:item._id,
                rating:item.rating,
                comment:item.comment,
                user:item.name,
            })
        })

  return (
    <Fragment>
        <MetaData title={`ALL REVIEWS - ADMIN`} />
        <div className='dashboard'>
            <Sidebar/>
            <div className='productReviewsContainer'>
            <form
              className="productReviewsForm"
              onSubmit={productReviewsSubmitHandler}
            >
              <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>
  
              <div>
                <StarIcon />
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
  
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false || productId ==='' ? true : false }
              >
                Search
              </Button>
            </form>
                {reviews && reviews.length > 0 ? (<DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight
                /> ): (<h1 className='productReviewsFormHeading'>
                  NO REVIEWS FOUND :(
                  </h1>)}
            </div>
        </div>
    </Fragment>
  )
}

export default ProductReviews