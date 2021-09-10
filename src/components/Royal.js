import React from "react"
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "../ApplicationViews";
// import { Login } from "./auth/Login";
// import { Register } from "./auth/Register";
import { Navbar } from "./nav/Navbar";
import "./Royal.css"

export const Royal = () => (
    <>
      <Route
      render={() => {
          return (
            <>
              <Navbar/>
              <ApplicationViews />
            </>
          );
        } 
      }
    />
    </>
)