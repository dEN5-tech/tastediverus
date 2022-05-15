import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {useMemo, useState} from "react";
import {
    Card,Tooltip
} from "react-bootstrap";
import {ListGroup} from "react-bootstrap";


import { Heart,BarChartFill,Calendar3,Search } from 'react-bootstrap-icons';
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {OverlayTrigger} from "react-bootstrap";
import Button from 'react-bootstrap-button-loader';




const ElemCard = ({title,srcset,id,likes,rating,year,width,history,data_posts}) => {
    const [SearchDara,setSearchDara]  = useState(false)
    const [data,setData]  = useState([])
    const [Fetched,setFetched]  = useState(false)

    async function GetAll(q,type){
        const response =await axios.get('/api/SearchAll', {
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


    function alertClicked() {

    }
    function SetLike() {
        axios.get('https://tastediverus.herokuapp.com/api/like', {
            params: {
                'id':`${id}`,
                'year': `${year}`,
                'title': `${title}`,
                'type': `${history.type.toString().split(":").join("")}`,
                'token': 'tk_r=427469|6ffbefef8ca908a7d478723a0aa7f9aa27d2656d22b196dc074a18a62aaae0bc022a183831ce947a6f29431f05def2436af715033edb143794765d807b9ac75f; tk_s=.eJxdkLtqAzEQRX8lqHah9-y6DgQ3MRjSpBGj0YgIOytYaQ3G-N-jkBQh5dx7uBzmLgK1NYdez7yIvTj65-kdXtThVexEyCu3D7Hv68bjKmkA0UTF7CdgK52J0udkNVkEIkRDObtZZjdlTTJrCZC1QcSZo46cDLKSIE2SkLRna2aSFgk8OsNKxYkyylmlBFZbhck5ZAPGkkLwNGVGO7QulbCXOnTvgkq_hQU_eagdrrjUax0E1W3p6y1QTd_F6e1P9gufttYKjrxtMZVraWMwqH9TT8d4wdbFYye2xuvPB6wG62fx-AIkWGJe.FVcNdw.ig4e1vvnXvPtAapCr5MBqgcvYMU'
            },
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'If-None-Match': 'W/"97-NAdJKsHkcTIIm4/Lj49a2o4WRzw"',
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
        })
        window.location.reload()
    }

    return (
    <Card style={{ width: width}}>
        <Card.Img variant="top" srcSet={srcset} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <ListGroup>
                <ListGroup.Item action onClick={SetLike}>
                    <Heart/> {likes}
                </ListGroup.Item>

                <ListGroup.Item>
                    <BarChartFill/> {rating}
                </ListGroup.Item>

                <ListGroup.Item>
                    <Calendar3/> {year}
                </ListGroup.Item>
            </ListGroup>
                {SearchDara ?
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
                                        overlay={<Tooltip id="button-tooltip">{Object.keys(item)[0]}</Tooltip>}
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
                        setFetched(true)
                        GetAll(title,history.type.toString().split(":").join("")).then(e=>setSearchDara(e.data))
                        setFetched(false)
                        }}
                      loading={Fetched}><Search/> Search</Button>
                )}



        </Card.Body>
    </Card>
    );
};

export default ElemCard;