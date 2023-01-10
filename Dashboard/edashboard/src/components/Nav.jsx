import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () =>{
    const auth = localStorage.getItem('user')
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/signup')
    }
    return(
        <div>
            <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li>{auth?<Link to="/signup" onClick={logout}>Logout</Link>:<Link to="/signup">SignUp</Link>}</li>
            </ul>
        </div>
    )
}

export default Nav