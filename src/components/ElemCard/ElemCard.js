import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useMemo, useState } from "react";
import {
    Card,
    Tooltip
} from "react-bootstrap";
import { ListGroup } from "react-bootstrap";



import { Heart, BarChartFill, Calendar3, Search,Link } from 'react-bootstrap-icons';
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import Button from 'react-bootstrap-button-loader';
import Iplayer from "../IPLayer/Iplayer";
import invert from 'invert-color';
import {useNavigate} from 'react-router-dom';


const enum_color ={
    artists:"#8c78b4",
    movies:"#f08c78",
    shows:"#148cc8"
}








const ElemCard = ({ title, srcset, id, likes, rating, year, width, history, data_posts,type,href_id,type_s }) => {

    const [data, setData] = useState([])
    const [Fetched, setFetched] = useState(false)
    const [show, setShow] = useState(false);
    const [SearchDara, setSearchDara] = useState(false)
    const [IPlayerData, setIPlayerData] = useState("")
    const navigate = useNavigate()


    async function GetAll(q, type) {
        const response = await axios.get(`https://tastediverus.herokuapp.com/api/SearchAll`, {
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

    function IndientElem(type_, data) {
        if (type_ == "kinopoisk") {

            return {
                href: `https://www.kinopoisk.ru/${data.type.replace("TV_","")}/${data.filmId}/`,
                icon: "https://www.google.com/s2/favicons?domain=www.kinopoisk.ru"
            }
        } else
        if (type_ == "animevost") {
            return {
                href: `https://reansn0w.github.io/AnimeVostORGCustomPlayer/New/?id=${data.id}`,
                icon: "https://www.google.com/s2/favicons?domain=anivost.org"
            }
        } else
        if (type_ == "myshows") {
            return {
                href: `https://myshows.me/view/${data.id}`,
                icon: "https://www.google.com/s2/favicons?domain=myshows.me"
            }
        }
        return null
    }


    function SetLike() {
        axios.get(`https://tastediverus.herokuapp.com/api/like`, {
            params: {
                'id': `${id}`,
                'year': `${year}`,
                'title': `${title}`,
                'type': `${type_s}`,
                'token': `${JSON.parse(localStorage.getItem('cookie')).cookie}`
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
        }).then(() => {
            window.location.reload()
        })

    }

    function openPlayer(e) {

        axios.get(`https://tastediverus.herokuapp.com/api/AhoyAgregator?kinopoisk=${SearchDara[2]?.kinopoisk.filmId}`).then((e) => {
            setIPlayerData(e.data.data.collaps)
            console.log(IPlayerData)
            setShow(true)
        })
    }

    function openSim(e) {
        navigate(`/similar/${href_id}/${id}`,{state:{type:type_s}});
    }

    return (
        <Card /*style={{backgroundColor: enum_color[type]}}*/>
        <Iplayer
            show={show}
            title={`${SearchDara[2]?.kinopoisk.nameRu} | ${IPlayerData.quality}`}
            url={IPlayerData.iframe}
            setShow={setShow}
        ></Iplayer>
        <Card.Img variant="top" srcSet={srcset} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <ListGroup>
                <ListGroup.Item action onClick={SetLike}  /*style={{backgroundColor: invert(enum_color[type])}}*/>
                    <Heart/> {likes}
                </ListGroup.Item>

                <ListGroup.Item  /*style={{backgroundColor: invert(enum_color[type])}}*/>
                    <BarChartFill/> {rating}
                </ListGroup.Item>

                <ListGroup.Item  /*style={{backgroundColor: invert(enum_color[type])}}*/>
                    <Calendar3/> {year}
                </ListGroup.Item>
                <ListGroup.Item
                /*style={{backgroundColor: invert(enum_color[type])}}*/
                 action onClick={openSim}>
                    <Link/> similar
                </ListGroup.Item>
                {SearchDara  ?
                    (
                        <ListGroup.Item action onClick={openPlayer}  /*style={{backgroundColor: invert(enum_color[type])}}*/>
                            open in player
                        </ListGroup.Item>
                    ) : null}
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
                        GetAll(title,type_s).then(e=>setSearchDara(e.data))
                        setFetched(false)
                        }}
                        /*style={{backgroundColor: invert(enum_color[type])}}*/
                      loading={Fetched}><Search/> Search</Button>
                )}



        </Card.Body>
    </Card>
    );
};

export default ElemCard;