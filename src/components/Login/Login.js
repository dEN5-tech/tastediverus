import React, {useState} from 'react';

import { Label, Input } from '@rebass/forms'
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgreeBtn = styled.button`
  color: #e90707;
  background-color: #282c34;
`;




const Login = () => {
    const [pass,setPass] = useState()
    const navigate = useNavigate();
    const [email,setEmail] = useState()
    function Loginprocessed(elem) {
        elem.preventDefault()
        axios.get(`http://localhost:3001/api/login?email=${email}&password=${pass}`, {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'If-None-Match': 'W/"ee-9my1j9xEhjJCXILA5XfXPvpkwQo"',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            }
        }).then(function (response) {
            localStorage.setItem('cookie', JSON.stringify(response.data));
            /*JSON.parse(localStorage.getItem('cookie'))*/
            navigate("/posts:1");
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
            <AgreeBtn onClick={Loginprocessed}>Login</AgreeBtn>

        </div>

    );
};

export default Login;