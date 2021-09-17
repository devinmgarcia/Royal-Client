import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "./OrderProvider";
import "./Order.css"

export const Orders = () => {
    const {orders, getOrders, addTracking} = useContext(OrderContext)
    const [currentOrders, setCurrentOrders] = useState({})

    useEffect(()=>{
        getOrders()
    },[])

    const handleUserInput = (event) => {
        const order = orders.find(order=>order.id === parseInt(event.target.name))
        order.tracking_info = event.target.value
        const currentOrderCopy = {...currentOrders}
        currentOrderCopy[order.id] = order
        setCurrentOrders(currentOrderCopy)
    }

    return (
        <div className="order_wrapper">
            {orders.map(order=>
            <>
            <div className="order">
             {order.recipient}
             {order.billing_street_one}
             {order.billing_street_two}
             {order.billing_city}
             {order.billing_state}
             {order.billing_zip}
             {order.shipping_street_one}
             {order.shipping_street_two}
             {order.shipping_city}
             {order.shipping_state}
             {order.shipping_zip}
             {order.date}
             {order.tracking_info ? order.tracking_info : "Awaiting Shipment"}
            </div>
            {!order.tracking_info  ?
            <>
            <input name={order.id} onChange={handleUserInput} type="text" className="add_tracking" />
            <button onClick={()=>{addTracking(currentOrders[order.id])}}>ADD TRACKING</button>
            </>
            : ""
            }
            </>
                )}
        </div>
    )
}