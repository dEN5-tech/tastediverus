import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button  from 'react-bootstrap/Button';
import axios from "axios";
import {useMemo, useState} from "react";
import {
    Card,Tooltip
} from "react-bootstrap";
import {ListGroupItem} from "react-bootstrap";
import {ListGroup} from "react-bootstrap";
import {useParams} from "react-router-dom";

import { Heart,BarChartFill,Calendar3,Search } from 'react-bootstrap-icons';
import { Icon } from '@iconify/react';
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {OverlayTrigger} from "react-bootstrap";






const ElemCard = ({title,srcset,id,likes,rating,year,width,history,data_posts}) => {
    const [SearchDara,setSearchDara]  = useState([])
    const [data,setData]  = useState([])
    const [Fetched,setFetched]  = useState(false)

    async function GetAll(q,type){
        const response =await axios.get('http://localhost:3001/api/SearchAll', {
            params: {
                'query': q,
                'type': type
            },
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'If-None-Match': 'W/"18ba-xlcu4SzE3rzJSp/5L5XbCfbiXIQ"',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            }
        })
        return response.data
    }

    function IndientElem(type_,data){
        if(type_=="kinopoisk"){

            return {href:
                    `https://www.kinopoisk.ru/${data.type.replace("TV_","")}/${data.filmId}/`,icon:
                    "https://www.google.com/s2/favicons?domain=www.kinopoisk.ru"}
        }else
        if(type_=="animevost"){
            return {href:
                    `https://reansn0w.github.io/AnimeVostORGCustomPlayer/New/?id=${data.id}`,icon:
                    "https://www.google.com/s2/favicons?domain=anivost.org"}
        }else
        if(type_=="myshows"){
            return {href:
                    `https://myshows.me/view/${data.id}`,icon:
                    "https://www.google.com/s2/favicons?domain=myshows.me"}
        }
        return null
    }


    function SetLike(elem) {
        axios.get(`http://localhost:3001/api/like?id=${id}&year=${year}&title=${title}&type=${history.type.toString().split(":").join("")}&token=${JSON.parse(localStorage.getItem('cookie')).cookie}`)
            .then(function (response) {
                return setData(response.data.data)
            })
        axios.get(`http://localhost:3001/api/get_data?offset=0&count=20&type=${history.type.toString().split(":").join("")}&token=${JSON.parse(localStorage.getItem('cookie')).cookie}`)
            .then(function (response) {
                return data_posts(response.data.data)
            })
    }

    return (
    <Card style={{ width: width}}>
        <Card.Img variant="top" srcSet={srcset} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <ListGroup>
                <ListGroup.Item><Heart/> {likes}</ListGroup.Item>
                <ListGroup.Item><BarChartFill/> {rating}</ListGroup.Item>
                <ListGroup.Item><Calendar3/> {year}</ListGroup.Item>
            </ListGroup>
                {Fetched ?
                (
                    <Row>
                        {SearchDara?.map(item => {
                            if(Object.keys(item).length){
                                let elems = IndientElem(Object.keys(item)[0],item[Object.keys(item)[0]])
                                return (
                                <Col>

                                    <Card.Link href={elems.href}>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id="button-tooltip">
                                                {Object.keys(item)[0]}
                                            </Tooltip>}
                                        >
                                            <img src={elems.icon}/>
                                        </OverlayTrigger>
                                    </Card.Link>
                                </Col>
                                )
                            }})}
                    </Row>
                ) :
                (
                    <Button onClick={(e_)=>{
                        GetAll(title,history.type.toString().split(":").join("")).then(e=>setSearchDara(e.data))
                        setFetched(true)
                    }}><Search/> Search</Button>
                )}



        </Card.Body>
    </Card>
    );
};



export default ElemCard;