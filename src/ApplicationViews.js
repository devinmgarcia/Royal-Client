import React from "react";
import { Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Cart } from "./components/cart/Cart";
import { CartProvider } from "./components/cart/CartProvider";
import { Home } from "./components/home/Home";
import { Manage } from "./components/manage/Manage";
import { ProductEdit } from "./components/manage/ProductEdit";
import { ProductForm } from "./components/manage/ProductForm";
import { ProductImageProvider } from "./components/manage/ProductImageProvider";
import { OrderProvider } from "./components/order/OrderProvider";
import { Orders } from "./components/order/Orders";
import { ProductDetail } from "./components/shop/ProductDetail";
import { ProductProvider } from "./components/shop/ProductProvider";
import { ProductTypeProvider } from "./components/shop/ProductTypeProvider";
import { Shop } from "./components/shop/Shop";

export const ApplicationViews = () => {

  return (
    <>
      <ProductProvider>
        <ProductTypeProvider>
          <ProductImageProvider>
            <CartProvider>
              <OrderProvider>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/Shop">
                  <Shop />
                </Route>
                <Route exact path="/Product/:productId(\d+)">
                  <ProductDetail />
                </Route>
                <Route exact path="/Cart">
                  <Cart />
                </Route>
                <Route exact path="/Login">
                  <Login />
                </Route>
                <Route exact path="/Register">
                  <Register />
                </Route>
                <Route exact path="/Manage">
                  <Manage />
                </Route>
                <Route exact path="/Orders">
                  <Orders />
                </Route>
                <Route exact path="/ProductForm">
                  <ProductForm />
                </Route>
                <Route exact path="/Manage/:productId(\d+)">
                  <ProductEdit />
                </Route>
                </OrderProvider>
            </CartProvider>
          </ProductImageProvider>
        </ProductTypeProvider>
      </ProductProvider>
    </>
  );
};
