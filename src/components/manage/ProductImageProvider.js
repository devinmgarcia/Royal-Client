import React, { useState, createContext } from "react";

export const ProductImageContext = createContext();

const API = "http://localhost:8000"

export const ProductImageProvider = (props) => {

	const deleteProductImage = (id) => {
		return fetch(`${API}/product_images/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
			},
		})
	};

	return (
		<ProductImageContext.Provider
			value={{
                deleteProductImage
			}}
		>
			{props.children}
		</ProductImageContext.Provider>
	);
};