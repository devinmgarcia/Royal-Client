import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ProductContext } from "../shop/ProductProvider";
import { ProductTypeContext } from "../shop/ProductTypeProvider";
import { ProductImageContext } from "./ProductImageProvider";
import "./Manage.css"

export const ProductEdit = () => {
    const {productTypes, getProductTypes} = useContext(ProductTypeContext)
    const {product, updateProduct, getProductById} = useContext(ProductContext)
    const {deleteProductImage} = useContext(ProductImageContext)
    const [currentProduct, setCurrentProduct] = useState({})
    const [currentPictures, setCurrentPictures] = useState([]);
    const history = useHistory()
    const {productId} = useParams()

    useEffect(()=>{
        getProductTypes()
    },[])

    useEffect(()=>{
        getProductById(productId)
    },[productId])

    useEffect(()=>{
        const chosenProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            type_id: product.type?.id,
        }
        setCurrentProduct(chosenProduct)
    },[product])

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
		const newProduct = { ...currentProduct };
		newProduct[event.target.name] = event.target.value;
		setCurrentProduct(newProduct);
	};

    const checkForm = () => {
		if (
			currentProduct.title === undefined ||
			currentProduct.price === undefined ||
			currentProduct.type_id === undefined
		) {
			return false;
		} else {
			return true;
		}
	};

    const handleAEditProduct = () => {
		if (checkForm() === true) {
			updateProduct({
                id: currentProduct.id,
				title: currentProduct.title,
				price: currentProduct.price,
				images: currentPictures,
				type_id: parseInt(currentProduct.type_id)
			}).then(() => history.push("/Manage"));
		} else {
			window.alert("Please fill in all form fields before submitting post.");
		}
	};

    return (
        <>
        <div className="edit_form">
            <input value={currentProduct.title} name="title" type="text" placeholder="Title" onChange={handleControlledInputChange} />
            <input value={currentProduct.price} name="price" type="number" placeholder="Price" onChange={handleControlledInputChange} />
            <input multiple type="file" id="image_url" className="postFormField" onChange={createProductImageString}/>
            <select name="type_id" value={currentProduct.type_id} onChange={handleControlledInputChange}>
                <option value="none">Select Type:</option>
                {productTypes.map(type =>
                <option selected={currentProduct.type?.id === type.id ? true : false} key={type.id} value={type.id}>{type.name}</option>
                    )}
            </select>
            <button onClick={handleAEditProduct}>Edit Product</button>
        </div>
        <div className="edit_images">
            {product.productimage_set?.map(set=>
            <>
            <img className="edit_image" src={set.image} alt="" />
            <button onClick={(e)=>{e.preventDefault(); deleteProductImage(set.id).then(()=>{getProductById(productId)})}}>REMOVE</button>
            </>
            )}
        </div>
        </>
    )
}