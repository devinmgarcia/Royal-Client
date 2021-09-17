import React, { useState, createContext } from "react";

export const ProductTypeContext = createContext();

const API = "http://localhost:8000"

export const ProductTypeProvider = (props) => {
	const [productTypes, setProductTypes] = useState([])

	const getProductTypes = () => {
		return (
			fetch(`${API}/product_types`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				},
			}			
		)).then((res) => res.json())
		.then(setProductTypes)
	};

	return (
		<ProductTypeContext.Provider
			value={{
                productTypes,
                getProductTypes,
			}}
		>
			{props.children}
		</ProductTypeContext.Provider>
	);
};