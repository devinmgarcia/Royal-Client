import React, { useState, createContext } from "react";

export const ProductContext = createContext();

const API = "http://localhost:8000"

export const ProductProvider = (props) => {
	const [products, setProducts] = useState([]);

	const getProducts = () => {
		return (
			fetch(`${API}/products`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				},
			}			
		)).then((res) => res.json())
		.then(setProducts)
	};

	return (
		<ProductContext.Provider
			value={{
                products,
                getProducts
			}}
		>
			{props.children}
		</ProductContext.Provider>
	);
};