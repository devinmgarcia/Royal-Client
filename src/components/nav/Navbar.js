import { useHistory } from "react-router-dom"
import "./Navbar.css"


export const Navbar = () => {

    const history = useHistory()

    return (
        <div className="navbar">
         <button onClick={()=>{history.push("/Shop")}}>SHOP</button>
         <button>ABOUT</button>
         <button onClick={()=>{history.push("/")}}>ROYAL PAIN IN THE GLASS</button>
         <button>SIGN IN</button>
         <button>CART</button>
        </div>
    )
}