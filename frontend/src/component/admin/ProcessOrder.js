import React , { Fragment , useEffect } from 'react'
// import '../Order/OrderDetails.css'
import { useSelector , useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link, useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { getOrderDetails , clearErrors , updateOrder } from '../../actions/orderAction'
import Loader from '../Loader/Loader'
import { useAlert } from 'react-alert'
import Sidebar from './Sidebar'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import "./processOrder.css";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { useState } from 'react'
import { Button } from '@mui/material'



const ProcessOrder = () => {
  const { order , loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams()

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };


  const [status, setStatus] = useState("");

  // console.log(order.user.name)

  useEffect(() => {
    // if () {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, id , isUpdated , updateError]);
  return (
    <Fragment>
      <div className='dashboard'>
      <Sidebar />
      <div className='newProductContainer'>
      {!order?.user ? (
        <Loader/>
      ) : (
        <Fragment>
          <MetaData title="PROCESS ORDER" />
          <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >

          
          <div>

            <div className='confirmshippingArea'>

              <div className="orderDetailsContainerBox">
                {/* <p>{id}</p> */}
               { order.user !=='undefined' ? <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div> : 'abc'}
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                        }
                        >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>
                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                        }
                        >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
            </div>
            <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
             </div>
             </div>
        </Fragment>
      )}
      </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;