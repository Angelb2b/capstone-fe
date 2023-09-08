import React, { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode'
import Login from "../Components/Pages/Login";
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";

const auth = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn"))
};

export const useSession = () => {
    const session = auth();
    const decodedSession = session ? jwtDecode(session) : null;
    const location = useLocation()


    const navigate = useNavigate()

    useEffect(() => {


        if(!localStorage.getItem("userLoggedIn")) {
            
            if (location.pathname === '/') navigate('/')
            else navigate('/login', { replace: true })
        } 
    }, [navigate, session])
    

    return decodedSession;
}


const ProtectedRoutes = () => {

    const navigate = useNavigate()
    const isAuthorized = auth();
    const session = useSession();
    
    return isAuthorized ? <Outlet /> : <Login />
}

export default ProtectedRoutes;