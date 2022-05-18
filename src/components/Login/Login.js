import React, {useState} from 'react';

import { Label, Input } from '@rebass/forms'
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap-button-loader';
import {ExclamationDiamondFill} from "react-bootstrap-icons";


const AgreeBtn = styled.button`
  color: #e90707;
  background-color: #282c34;
`;


const Login = ({setcookie}) => {
    const [pass,setPass] = useState()
    const navigate = useNavigate();
    const [email,setEmail] = useState()
    const [show, setShow] = useState(true);
    const [warn, setWarn] = useState(null);
    const [variant, setVariant] = useState("primary");
    function Loginprocessed(elem) {
        elem.preventDefault()
        axios.get(`${process.env.URL_PATH_REMOTE || "https://tastediverus.herokuapp.com/api"}/login?email=${email}&password=${pass}`
        ).then(function (response) {
            if(response.data.cookie){
                setcookie(response.data)
                navigate("/posts:1");
            }else{
                setShow(true)
                setVariant("warning")
                setWarn(<ExclamationDiamondFill/>)
            }
        }
            ).catch((e)=>{
            setShow(true)
            setVariant("warning")
            setWarn(<ExclamationDiamondFill/>)
        })

    }

    return (
        <div
            sx={{
                maxWidth: 512,
                mx: 'auto',
                px: 3,
            }}>
            <div>
                <Label htmlFor='email'>Email</Label>
                <Input  onChange={(e)=>setEmail(e.target.value)}
                    id='email'
                    name='email'
                    type='email'
                    placeholder='jane@example.com'
                />
            </div>
            <div>
                <Label htmlFor='password'>Password</Label>
                <Input onChange={(e)=>setPass(e.target.value)}
                    id='password'
                    name='password'
                    type='password'
                    placeholder='password'
                />
            </div>
            <Button onClick={(e_)=>{
                setVariant("primary")
                setWarn(null)
                setShow(true)
                Loginprocessed(e_)
                setShow(false)
            }}
                variant={variant} icon={warn}   loading={!show} disabled={!show}>Login</Button>

        </div>

    );
};

export default Login;
