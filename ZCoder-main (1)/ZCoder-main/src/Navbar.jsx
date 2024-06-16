import React from "react"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (<div>
                <nav>
                    <NavLink className={(e)=>{return e.isActive?"red":""}} to="/login"><li>Home</li></NavLink>
                    <NavLink className={(e)=>{return e.isActive?"red":""}} to="/compProfile"><li>Complete Profile</li></NavLink>
                </nav>
            </div>)
}

export default Navbar;