import React, { useState, useEffect } from "react";
import "./Addproduct.css";
import Axios from "../../Axios/axios";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const [productData, setProductData] = useState({});
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const getProductData = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };
  const sendProductData = async (event) => {
    event.preventDefault();
    setErrors(validateForm(productData));
    setSubmit(true);
  };
  useEffect(async () => {
    
    if (Object.keys(errors).length == 0 && submit) {
      const response = await Axios.post("/addproduct", productData);
      const { status, message } = await response.data;
      if (status == "success") {
        navigate("/viewproduct");
      }
      if (status == "error") {
        setErrors({ name: message });
      }
    }
  }, [errors]);
  const validateForm = (data) => {
    let errors = {};

    if (!data.productName) {
      errors.name = "Name is required";
    }
    if (!data.price) {
      errors.price = "Price is required";
    }
    if (!data.quantity) {
      errors.quantity = "Quantity is required";
    }
    if (!data.category) {
      errors.category = "Category is required";
    }

    return errors;
  };
  return (
    <div className="container">
      
      <div className="form-container">
        <form action="">
          <h2>Add product</h2>
          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">Name</label>
              <input type="text" name="productName" onChange={getProductData} />
            </div>
            <p>{errors.name}</p>
          </div>
          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">Price</label>
              <input type="number" name="price" onChange={getProductData} />
            </div>
            <p>{errors.price}</p>
          </div>
          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">Quantity</label>
              <input type="number" name="quantity" onChange={getProductData} />
            </div>
            <p>{errors.quantity}</p>
          </div>
          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">Category</label>
              <input type="text" name="category" onChange={getProductData} />
            </div>
            <p>{errors.category}</p>
          </div>

          <div className="buttons">
            <button onClick={sendProductData}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
