import React, { Fragment, useEffect ,useState } from 'react'
import Carousel from 'react-material-ui-carousel'
// import Product from '../Home/Product'
import './ProductDetails.css'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import { productDetailsReducer } from '../../reducers/productReducer'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import Loader from '../Loader/Loader'
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartActions'
import { Dialog , 
         DialogActions,
         DialogContent,
         DialogTitle,
         Button,
         Rating,
          } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants'


const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {product , loading , error  } = useSelector(state=>state.productDetails)

    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {

        if(product.Stock <= quantity) return;

        const qty = quantity + 1
        setQuantity(qty)
    }

    const decreaseQuantity = () => {
        // if(product.Stock <= quantity) return;
        if(quantity <= 1) return;

        const qty = quantity - 1
        setQuantity(qty)
    }
    const { success , error:reviewError } = useSelector(
        (state) => state.newReview
    )

    const {id} = useParams();

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id , quantity))
        alert.success('Item added to cart')
    }

    console.log("id : " + id)
    useEffect(()=>{
        if(error){
            dispatch(clearErrors())
        }
        if(reviewError){
            alert.error(reviewError)
            dispatch(clearErrors())
        }

        if(success){
            alert.success('Your review has been submitted')
            dispatch({type : NEW_REVIEW_RESET})
        }

        dispatch(getProductDetails(id))
    } , [dispatch , id , error, alert , reviewError , success]);


    const options = {
        size: "large", 
        value: product.ratings , 
        readOnly:true,
        precision:0.5,
    }

    // const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const reviewSubmitHandler = () => {
        const myForm = new FormData()
        myForm.set('rating' , rating )
        myForm.set('comment' , comment)
        myForm.set('productId' , id)

        dispatch(newReview(myForm))

        setOpen(false)

    }


    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <Fragment>
            {loading ? ( <Loader /> ) : (
            <Fragment>
            <MetaData title={`${product.name} -- ECOMMERCE`} />
            <div className='ProductDetails'>
                {/* <div> */}
                {/* <div className="carImg"> */}
                    <Carousel className='ccc'>
                        {product.images && 
                            product.images.map((item , i) => (
                                <img
                                    className="CarouselImage"
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))}
                    </Carousel>
{/* </div> */}
                {/* </div> */}
                <div>
                    <div className='detailsBlock-1'>
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                    </div>
                    <div className='detailsBlock-2'>
                            <Rating {...options}/>
                            <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className='detailsBlock-3'>
                        <h1>{`₹${product.price}`}</h1>
                    </div>
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly type="number" value={quantity}/>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to cart</button>
                    </div>{" "}
                    <div className='detailsBlock-3-2'>

                    <p>
                        Status:{" "}
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}> 
                                {product.Stock < 1 ? "OutOfStock" :"InStock"}
                        </b>
                    </p>
                    </div>
                    <div className='detailsBlock-4'>
                        Description: <p>{product.desc}</p>
                    </div>
                    <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                                
                </div>
            </div>
            <h3 className='reviewsHeading'> REVIEWS </h3>

            <Dialog
                aria-labelledby='simple-dialog-title'
                open={open}
                onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review </DialogTitle>
                <DialogContent className='submitDialog'>
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size='large'
                    />

                    <textarea
                        className='submitDialogTextArea'
                        cols='30'
                        rows='5'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    >
                    </textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                    <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>

                </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
                <div className='reviews'>
                    {product.reviews &&
                    product.reviews.map((review)=><ReviewCard review = {review}/>)}
                </div>
            ) : (
                <p className='noReviews'>No Reviews Yet</p>
            )}
        </Fragment>)}
        </Fragment>
  ) 
}

export default ProductDetails