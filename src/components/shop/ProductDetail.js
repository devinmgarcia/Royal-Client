import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ProductContext } from "./ProductProvider";
import { CartContext } from "../cart/CartProvider";
import "./ProductDetail.css"

export const ProductDetail = () => {
    const {product, getProductById} = useContext(ProductContext)
    const {addToCart} = useContext(CartContext)
    const {productId} = useParams()
    const history = useHistory()

    useEffect(()=>{
        getProductById(productId)
    },[productId])

    return (
        <>
       <div className="product_detail_wrapper">
           <div className="product_detail_title">{product.title}</div>
           <div className="product_detail_price">${product.price}</div>
           {/* <img className="product_detail_image" src={product.productimage_set[0]?.image} alt="" /> */}
           <button onClick={()=>{addToCart(product.id).then(()=>{history.push('/Cart')})}} className="add_to_cart">ADD TO CART</button>
       </div>
        </>
    )
}