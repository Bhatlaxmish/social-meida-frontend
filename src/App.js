import React, { useState, useCallback, useContext } from 'react';
import Navbar from "./components/Navbar";
import { RouterProvider, Route, Routes, BrowserRouter, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';/* instead of broweserRouter  routerprovider */
import Card from './components/Card';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from "./components/Signup";
import Chat from './components/Chat';
import { Authcontext } from "./components/Authcontext";
import ForgotPassword from './components/ForgotPassword';
import Account from './components/Account';



const router = createBrowserRouter(createRoutesFromElements(

    <Route path='/' elements={<Login />}>
        <Route index element={<Navbar />} />
        <Route path="/login" element={<Login />}>
            {/* <Route index element={<Navbar />} loader={blogpostloader} /> */}
            <Route path=":id" element={<Navbar />} />
        </Route>
        <Route path="/blog/new" element={<Navbar />} />
    </Route>
));


export default function App() {

    const auth = useContext(Authcontext);
    const [userid,setuserid]=useState();
const myid=(data)=>{
    setuserid(data);
}

let sta;
if(localStorage.getItem("token")!=null)
{
    sta=true;
}
else {
    sta=false;
}
    const [isLoggedIn, setIsLoggedIn] = useState(sta);

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);
    let routes;
    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/chat" element={<Chat />} />


            </Routes>

        )
    }



    return (
        <div>
            <Authcontext.Provider value={{ isLoggedin: isLoggedIn, login: login, logout: logout,myid:myid,userid:userid }}>

                <Navbar />
                <Routes>


                    <Route path="/" element={<Homepage/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                   

                    {isLoggedIn && 
                    
                    <Route path="/Account" element={<Account />} />
}
{isLoggedIn&&
                    <Route path="/chat" element={<Chat></Chat>}></Route>
                       
                        }
                   

                </Routes>
            </Authcontext.Provider>
        </div>


    );
}






