import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { CartContext } from "../cart/CartProvider";
import { PayPalScriptProvider ,PayPalButtons } from "@paypal/react-paypal-js";
import { OrderContext } from "../order/OrderProvider";
import "./Cart.css"

export const Cart = () => {
    const {cart, getCart, removeFromCart} = useContext(CartContext)
    const {captureOrder} = useContext(OrderContext)
    const history = useHistory()
    useEffect(()=>{
        getCart()
    },[])

    return (
        <>
        <div className="cart_wrapper">
           {cart.products?.map(product=>
                <div key={product.id} className="cart_product">
                    <img className="cart_product_image" src={product.productimage_set[0]?.image} alt="" />
                    <div className="cart_product_title">{product.title}</div>
                    <div className="cart_product_price">${product.price}</div>
                    <button onClick={()=>{removeFromCart(product.id)}} className="remove_from_cart">REMOVE</button>
                </div>
           )}
           <div className="cart_subtotal">
               Subtotal: ${cart.total}
           </div>
           </div>
           <PayPalScriptProvider options={{ "AdHgShLzd1RBtpQ8IFwT7wVIPN8cRs89SZ-fA7j3FKt3lYAB79ZE1ZQ30nN341wmNMlJKwjbzjbdJy4Y": "test" }}>
            <PayPalButtons
            className="paypal"
            style={{ color: "gold", shape: "rect", label: "pay", height: 40 }}
            createOrder={(data, actions) => {
                    return actions.order.create({        
                            purchase_units: [
                                        {
                                            amount: {
                                                value: cart.total,
                                            },
                                        },
                                    ],
                                });
                            }}
            onApprove={(data, actions)=>{
                return actions.order.capture().then((order)=>{ order.cart_id = cart.id; captureOrder(order)})
            }}
            />
            </PayPalScriptProvider>
       </>
    )
}