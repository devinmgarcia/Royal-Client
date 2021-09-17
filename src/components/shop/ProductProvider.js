import React, { useState, createContext } from "react";

export const ProductContext = createContext();

const API = "http://localhost:8000"

export const ProductProvider = (props) => {
	const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})

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

    const getProductById = (id) => {
		return (
			fetch(`${API}/products/${id}`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				},
			}
		)).then((res) => res.json())
		.then(setProduct)
	};

	const addProduct = (product) => {
		return fetch(`${API}/products`, {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(product)
		}).then(getProducts);
	};

	const updateProduct = (product) => {
		return fetch(`${API}/products/${product.id}`, {
			method: "PUT",
			headers: {
				Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(product),
		}).then(getProducts);
	};

	const deleteProduct = (id) => {
		return fetch(`${API}/products/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${localStorage.getItem("royal_user_id")}`,
			},
		}).then(getProducts);
	};

	return (
		<ProductContext.Provider
			value={{
                products,
                product,
                getProducts,
                getProductById,
				addProduct,
				updateProduct,
				deleteProduct
			}}
		>
			{props.children}
		</ProductContext.Provider>
	);
};