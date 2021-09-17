import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ProductContext } from "../shop/ProductProvider";
import "./Manage.css"

export const Manage = () => {
    const {products, getProducts, deleteProduct} = useContext(ProductContext)
    const history = useHistory()

    useEffect(()=>{
        getProducts()
    },[])

    return (
        <>
        <button onClick={()=>{history.push(`/ProductForm`)}}>Add Product</button>
        <div className="manage_products_wrapper">
            {products.map(product => 
            <div className="manage_product">
                <img src={product.productimage_set[0]?.image} alt="" className="image" />
                <div className="manage_product_text">
                    <div>{product.title}</div>  
                    <div>${product.price}</div>  
                </div>
                <button onClick={()=>{history.push(`/Manage/${product.id}`)}}>EDIT</button>
                <button onClick={(e)=>{
                    e.preventDefault()
                    deleteProduct(product.id)
                    history.push('/Manage')
                    }}>DELETE</button>
            </div>
            )}
        </div>
        </>
    )
}