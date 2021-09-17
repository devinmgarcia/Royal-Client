import { useHistory } from "react-router-dom"
import "./Navbar.css"


export const Navbar = () => {

    const history = useHistory()
    const isAdmin = JSON.parse(localStorage.getItem("royal_admin"))
    const royal_user = localStorage.getItem("royal_user_id")

    return (
        <div className="navbar">
         <button onClick={()=>{history.push("/Shop")}}>SHOP</button>
         <button>ABOUT</button>
         <button onClick={()=>{history.push("/")}}>ROYAL PAIN IN THE GLASS</button>
         {
         royal_user
         ? <button onClick={()=>{
            localStorage.removeItem("royal_user_id");
            localStorage.removeItem("royal_admin");
            history.push("/login")
            }}>SIGN OUT</button>
         : <button onClick={()=>{history.push("/login")}}>SIGN IN</button>
         }
         
         {
         isAdmin
         ? <>
            <button  onClick={()=>{history.push("/Manage")}}>MANAGE</button>
            <button  onClick={()=>{history.push("/Orders")}}>ORDERS</button>
           </>
         : ""
         }
         <button onClick={()=>{history.push("/Cart")}}>CART</button>
        </div>
    )
}