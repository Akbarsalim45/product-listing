import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import Axios from '../../Axios/axios'

import './ViewProduct.css'
function ViewProduct() {
    const [products,setProducts]= useState([])
    useEffect(async()=>{
        const response= await Axios.get('/viewproduct')
        const {status,products}= await response.data
        setProducts(products)
    },[])
    
  return (
    <div className='container'>
        <div className="table-container">
            <h2>List products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        return(
                        <tr>
                            <td>{item.Name}</td>
                            <td>{item.Price}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.Category}</td>
                        </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            <Link to="/addproduct"><button>Add product</button></Link>
        </div>
    </div>
  )
}

export default ViewProduct