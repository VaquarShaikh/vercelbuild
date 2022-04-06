import React, { Fragment , useEffect , useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors , createProduct } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate } from 'react-router-dom'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { useParams } from 'react-router-dom'
import { getUserDetails, updateUser } from '../../actions/userAction'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Loader from '../Loader/Loader'


const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const {error, loading, user } = useSelector((state) => state.userDetails);
    const {error : updateError, loading : updateLoading, isUpdated } = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    
  
    let navigate = useNavigate()

    const {id} = useParams()

    
    useEffect(() => {
        if(user && user._id !== id){
            dispatch(getUserDetails(id))
          }else{
            setName(user.name);
            setEmail(user.email)
            setRole(user.role)
          }
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
     
     
      if (updateError) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if(isUpdated){
          alert.success('User Updated Successfully')
          navigate('/admin/users' , {replace : true})
          dispatch({type : UPDATE_USER_RESET})
      }
  
      
    }, [dispatch, alert,error, navigate , id , isUpdated , updateError , user ]);
  
    const updateUserSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("role", role);
  
      

      // console.log(JSON.stringify(images))

      dispatch(updateUser( id , myForm ));
    };


  return (
    <Fragment>
      <MetaData title="UPDATE USER --ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading  ? <Loader/> : (
              <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>
  
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
  
              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
  
              <Button
                id="createProductBtn"
                type="submit"
                disabled={updateLoading ? true : false || role ==='' ? true : false }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateUser