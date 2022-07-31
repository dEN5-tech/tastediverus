import React, {useState,useEffect} from 'react';
import {Navigate
} from "react-router-dom";



const Logout = ({setcookie}) => {
    useEffect(()=>{
        setcookie(undefined)
    },[])

    return (
        <Navigate to={"/login"} />
    );
};

export default Logout;
