import React, { useState, createContext } from "react";

export const OrderContext = createContext();

const API = "http://localhost:8000"

export const OrderProvider = (props) => {
	const [orders, setOrders] = useState([])

	const getOrders = () => {
		return (
			fetch(`${API}/orders`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				},
			}			
		)).then((res) => res.json())
		.then(setOrders)
	};

	const captureOrder = (order) => {
		return fetch(`${API}/orders`, {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order)
		}).then(getOrders);
	};

	const addTracking = (order) => {
		return fetch(`${API}/orders/${order.id}`, {
			method: "PUT",
			headers: {
				Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order)
		}).then(getOrders);
	};

	return (
		<OrderContext.Provider
			value={{
				orders,
				getOrders,
				captureOrder,
				addTracking
			}}
		>
			{props.children}
		</OrderContext.Provider>
	);
};