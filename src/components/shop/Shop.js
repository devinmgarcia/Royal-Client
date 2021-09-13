import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductProvider";
import "./Shop.css"

export const Shop = () => {
    const {products, getProducts} = useContext(ProductContext)

    useEffect(()=>{
        getProducts()
    },[])

    return (
        <div className="products_wrapper">
            {products.map(product => 
            <div className="product">
                <div className="product_text">
                    <div>{product.title}</div>  
                    <div className="card_right">${product.price}</div>  
                </div>
            </div>
            )}
        </div>
    )
}