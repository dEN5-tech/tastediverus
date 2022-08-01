import React,{useEffect,useState} from 'react';
import {
    ListGroup
}
from "react-bootstrap";

import axios from "axios";



import {
    NavLink,useNavigate
} from "react-router-dom";


import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'

import {AlertNotify} from "./AlertNotify.js"


function Avatar({children}){
	console.log(children)
	return(
		<div>{children}<img
            src="https://img.tastedive.com/a/436542-1659099699-5be5b5e.jpg"
            alt="User avatar"
            width="32"
            height="32"
          /></div>
			)
		}



export const  AvatarBar = ({children,cookie,setcookie,last_view})=>{

    const nav = useNavigate()
    const [data,setData] = useState({})
    const [ViewST,setViewST] = useState(false)
    useEffect(()=>{ 
        if(last_view)
            setViewST(true)
        
        if(cookie?.cookie){

            axios.get(`https://tastediverus.herokuapp.com/api/get_avatar?token=${cookie.cookie}`).then((r)=>setData(r.data))
        }else if(cookie?.cookie === undefined){
            setData({})
        }
    },[cookie])
		return (
            <NavDropdown
            align="end"
            eventKey={1}
                title={
                    <div className="pull-left">
                        <Image className="thumbnail-image"
                            src={cookie?.cookie && data?.avatar_url||"https://tastedive.com/dist/images/td-cover.jpg"}
                            alt=""
                            rounded
            width="32"
            height="32"
                        />
                        {last_view && ViewST ? <AlertNotify/> : null}
                         {data?.nickname}
                    </div>
                }
                id="basic-nav-dropdown">
                                        {last_view ? <Dropdown.Item onClick={e=>{
                                            setViewST(false)
                            nav(`/view/${last_view.type}/${last_view.kinopoisk_id}/${last_view.title}`, { state: last_view.iframe_data })
                        }} >Продолжить просмотр {last_view && ViewST ? <AlertNotify/> : null}</Dropdown.Item> : null}
                {children.length >0  ? children.map((e)=><Dropdown.Item>{e}</Dropdown.Item>)  : <Dropdown.Item>{children}</Dropdown.Item>   }
        
            </NavDropdown>
		);
	}


