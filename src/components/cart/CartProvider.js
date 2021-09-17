import React, { useState, createContext } from "react";

export const CartContext = createContext();

const API = "http://localhost:8000"

export const CartProvider = (props) => {
    const [cart, setCart] = useState({})

	const getCart = () => {
		return (
			fetch(`${API}/cart`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				},
			}			
		)).then((res) => res.json())
		.then(setCart)
	};

	const addToCart = (id) => {
		return fetch(`${API}/cart/${id}/edit`, {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cart)
		}).then(getCart);
	};

	const removeFromCart = (id) => {
		return fetch(`${API}/cart/${id}/edit`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
			},
		}).then(getCart);
	};

	return (
		<CartContext.Provider
			value={{
                cart,
                getCart,
				addToCart,
				removeFromCart
			}}
		>
			{props.children}
		</CartContext.Provider>
	);
};