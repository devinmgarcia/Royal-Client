import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { ProductContext } from "./ProductProvider";
import "./Shop.css"

export const Shop = () => {
    const {products, getProducts} = useContext(ProductContext)
    const history = useHistory()

    useEffect(()=>{
        getProducts()
    },[])

    return (
        <div className="products_wrapper">
            {products.map(product => 
            <div className="product">
                <div>
                  <img className="product_image" src={product.productimage_set[0]?.image} alt="" /> 
                </div>
                <div className="product_text">
                    <button onClick={()=>{history.push(`/Product/${product.id}`)}}>{product.title}</button>  
                    <div className="card_right">${product.price}</div>
                </div>
            </div>
            )}
        </div>
    )
}