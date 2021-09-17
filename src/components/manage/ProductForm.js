import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ProductContext } from "../shop/ProductProvider";
import { ProductTypeContext } from "../shop/ProductTypeProvider";
import "./Manage.css"

export const ProductForm = () => {
    const {productTypes, getProductTypes} = useContext(ProductTypeContext)
    const {addProduct} = useContext(ProductContext)
    const [product, setProduct] = useState({})
    const [currentPictures, setCurrentPictures] = useState([]);
    const history = useHistory()

    useEffect(()=>{
        getProductTypes()
    },[])

    const getBase64 = (file, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(file);
	};

    const createProductImageString = (event) => {
		const product_images = []
		for (const file of event.target.files) {
			getBase64(file, (base64ImageString) => {
				product_images.push(base64ImageString)	
			});
		}
		setCurrentPictures(product_images);
	};

    const handleControlledInputChange = (event) => {
		const newProduct = { ...product };
		newProduct[event.target.name] = event.target.value;
		setProduct(newProduct);
	};

    const checkForm = () => {
		if (
			product.title === undefined ||
			product.price === undefined ||
			product.type_id === undefined
		) {
			return false;
		} else {
			return true;
		}
	};

    const handleAddProduct = () => {
		if (checkForm() === true) {
			addProduct({
				title: product.title,
				price: product.price,
				images: currentPictures,
				type_id: parseInt(product.type_id)
			}).then(() => history.push("/Manage"));
		} else {
			window.alert("Please fill in all form fields before submitting post.");
		}
	};

    return (
        <div>  
            <input value={product.title} name="title" type="text" placeholder="Title" onChange={handleControlledInputChange} />
            <input value={product.price} name="price" type="number" placeholder="Price" onChange={handleControlledInputChange} />
            <input multiple type="file" id="image" onChange={createProductImageString}/>
            <select name="type_id" value={product.type_id} onChange={handleControlledInputChange}>
                <option value="0">Select Type:</option>
                {productTypes.map(type =>
                <option key={type.id} value={type.id}>{type.name}</option>
                    )}
            </select>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    )
}