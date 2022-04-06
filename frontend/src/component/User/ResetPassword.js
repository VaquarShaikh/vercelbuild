import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { Link , useNavigate, useParams } from "react-router-dom";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';



const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    let navigate = useNavigate();
  
    const { error, success, loading } = useSelector((state) => state.forgotPassword);
  
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
  
    const {token} = useParams();

    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(resetPassword(token , myForm));
    };
  
    
    
    useEffect(() => {
  
  
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Updated Successfully");
  
      //   history.push("/account");
      navigate('/login' , {replace : true})
      
      }
  }, [dispatch, error, alert, success]);
  return (
      <Fragment>
        {loading ? (
            <Loader />
            ) : (
                <Fragment>
            <MetaData title="CHANGE PASSWORD" />
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Update Password</h2>
  
                <form
                  className="resetPasswordForm"
                  encType="multipart/form-data"
                  onSubmit={resetPasswordSubmit}
                  >
                  
                  
                  <div >
                                  <LockOpenIcon />
                                  <input
                                      type='password'
                                      placeholder='New Password'
                                      required
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                  />
                              </div>
                  
                  <div className='loginPassword'>
                                  <LockIcon />
                                  <input
                                      type='password'
                                      placeholder='Confirm Password'
                                      required
                                      value={confirmPassword}
                                      onChange={(e) => setConfirmPassword(e.target.value)}
                                      />
                              </div>
  
                  <input
                    type="submit"
                    value="Update"
                    className="resetPasswordBtn"
                    />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    )
}

export default ResetPassword