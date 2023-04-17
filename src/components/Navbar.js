
import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom';

import { Authcontext } from './Authcontext';
import "./Navbar.css";
// import Portal from './Portal';

const Navbar = () => {
    const auth = useContext(Authcontext);
    // console.log("nav",auth);
    let element;
    // localStorage.removeItem("token");
    console.log("afsd", auth.isLoggedin);
    if (auth.isLoggedin) {
        element = "logout"; 
    }
    else {
        element = "Login";
    }
    const [shownavbar, setshownavbar] = useState(false);

    const Opennavbar = () => {

        setshownavbar(!shownavbar)
    }
    const logoutfunction =()=>{
        console.log("hi");
auth.logout();
localStorage.removeItem("token");
console.log(auth.isLoggedin);
}


    return (


        <div>
            <div className='listofelements'>
                <img src="#" alt="" className='imageofnavbar' />
                <NavLink to='/'>

                    <li className='elements'> home</li>
                </NavLink>
                <NavLink to="/chat">

                    <li className='elements'>chat</li>
                </NavLink>

                <div className="floatright">
                    <NavLink to="/login">
                        
                   {!auth.isLoggedin && <li>login</li>
                   
                   
                   }
                    </NavLink>
<NavLink to="/">

                   {
                    auth.isLoggedin && <li onClick={logoutfunction}>logout</li>
                   }
</NavLink>

                    <NavLink to="/signup">

                        <li >Sign up</li>
                    </NavLink>


                    <NavLink to="/Account">

                        <li>acount</li>
                    </NavLink>

                    {/* <p>{movies}</p> */}
                </div>
            </div>

            <button className='button' onClick={Opennavbar}>{shownavbar ? "Close Menu" : "Open menu"}</button>



            {
                shownavbar &&
                <div className="mobileview" onClick={Opennavbar} >
                    <ul className='listofelementsare'>
                        <li className='elements'>social media </li>
                        <li className='elements'> home</li>
                        <li className='elements'>chat</li>
                        <li className='elements'>Login</li>
                        <li className='elements'>Sign up</li>

                        <label htmlFor="search">search</label>
                        <input className='inputofnavbar' type="text" />
                    </ul>
                </div>
            }
        </div>

    )
}
export default Navbar;