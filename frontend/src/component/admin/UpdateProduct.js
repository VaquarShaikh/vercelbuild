import React, { Fragment , useEffect , useState } from 'react'
// import './newProduct.css'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors , createProduct , updateProduct , getProductDetails } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate, useParams } from 'react-router-dom'
import { productDetailsReducer } from '../../reducers/productReducer'


// REPLACED PRODUCTID WITH ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const {id} = useParams()

    const {error:updateError, loading, isUpdated } = useSelector((state) => state.product);
    const {error , product} = useSelector((state) => state.productDetails)
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages , setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([]);
  
    let navigate = useNavigate()

    const categories = [
      "Laptop",
      "Footwear",
      "Bottom",
      "Tops",
      "Attire",
      "Camera",
      "SmartPhones",
    ];
  
    useEffect(() => {

      if(product && product._id !== id){
        dispatch(getProductDetails(id))
      }else{
        setName(product.name);
        setDesc(product.desc);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.Stock);
        setOldImages(product.images);
      }

      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Product Updated Successfully");
        // history.push("/admin/dashboard");
        navigate('/admin/products' , {replace : true})
        dispatch({ type: UPDATE_PRODUCT_RESET });
      }
    }, [dispatch, alert,error, navigate, id , product , isUpdated , updateError ]);
  
    const updateProductSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("desc", desc);
      myForm.set("category", category);
      myForm.set("Stock", Stock);
  
      images.forEach((image) => {
        myForm.append("images", image.url);
        console.log('image : ' + (image.url))
      });

      // console.log(JSON.stringify(images))

      dispatch(updateProduct(id , myForm));
    };
  
    const updateProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
  
      setImages([]);
      setImagesPreview([]);
      setOldImages([])
  
      files.forEach((file) => {
        const reader = new FileReader();

        console.log('file : ' + JSON.stringify(file))

        console.log('reader result : ' + reader.result)
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, {public_id: 'whatever', url: reader.result}]);
          }
        };
  
        reader.readAsDataURL(file);
      });
    };
    


  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages && oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Old Product Preview" />
              ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateProduct