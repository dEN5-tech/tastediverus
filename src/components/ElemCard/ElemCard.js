import
{
    Card,
    Tooltip
}
from "react-bootstrap";
import
{
    Col
}
from "react-bootstrap";
import
{
    Heart,
    BarChartFill,
    Calendar3,
    Search,
    Link,
    PlayCircleFill

}
from 'react-bootstrap-icons';
import
{
    ListGroup
}
from "react-bootstrap";
import
{
    OverlayTrigger
}
from "react-bootstrap";
import
{
    Row,
    Container
}
from "react-bootstrap";
import
{
    useMemo,
    useState,
    useEffect
}
from "react";
import
{
    useNavigate
}
from 'react-router-dom';
import "./index.css"
import Button from 'react-bootstrap-button-loader';
import Collapse from 'react-bootstrap/Collapse';
import Dropdown from 'react-bootstrap/Dropdown';
import Fade from 'react-bootstrap/Fade';
import Iplayer from "../IPLayer/Iplayer";
import LazyLoad from 'react-lazyload';
import Placeholder from 'react-bootstrap/Placeholder';
import React from 'react';
import axios from "axios";
import jp from 'jsonpath';








const enum_color = {
    artists: "#8c78b4",
    movies: "#f08c78",
    shows: "#148cc8"
}








const ElemCard = (
{
    title,
    kinopoisk_id,
    srcset,
    id,
    likes,
    rating,
    year,
    width,
    history,
    data_posts,
    type,
    href_id,
    type_s
}) =>
{

    const [data, setData] = useState()
    const [Fetched, setFetched] = useState(false)
    const [ymId, setymId] = useState(false)
    const [show, setShow] = useState(false);
    const [SearchDara, setSearchDara] = useState(false)
    const [IPlayerData, setIPlayerData] = useState("")
    const [titleRus, settitleRus] = useState(null)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);


    async function GetAll(params, type)
    {

        if (["m", "h"].includes(type))
        {
            const response = await axios.get(`https://tastediverus.herokuapp.com/api/search_kinopoisk`,
            {
                params:
                {
                    'query': params.query,
                    "year": params.year
                },
                headers:
                {
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
        else if (["s"].includes(type))
        {
            const response = await axios.get(`https://tastediverus.herokuapp.com/api/search_music`,
            {
                params:
                {
                    'query': params.q,
                    'type': params.type
                },
                headers:
                {
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

    }

    function IndientElem(type_, data)
    {
        if (type_ == "kinopoisk")
        {

            return {
                href: `https://www.kinopoisk.ru/${data.type.replace("TV_","")}/${data.filmId}/`,
                icon: "https://www.google.com/s2/favicons?domain=www.kinopoisk.ru"
            }
        }
        else
        if (type_ == "animevost")
        {
            return {
                href: `https://reansn0w.github.io/AnimeVostORGCustomPlayer/New/?id=${data.id}`,
                icon: "https://www.google.com/s2/favicons?domain=anivost.org"
            }
        }
        else
        if (type_ == "myshows")
        {
            return {
                href: `https://myshows.me/view/${data.id}`,
                icon: "https://www.google.com/s2/favicons?domain=myshows.me"
            }
        }
        return null
    }


    function SetLike()
    {
        axios.get(`https://tastediverus.herokuapp.com/api/like`,
        {
            params:
            {
                'id': `${id}`,
                'year': `${year}`,
                'title': `${title}`,
                'type': `${type_s}`,
                'token': `${JSON.parse(localStorage.getItem('cookie')).cookie}`
            },
            headers:
            {
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
        }).then(() =>
        {
            window.location.reload()
        })

    }

    function openPlayer(e)
    {
        axios.get(`https://tastediverus.herokuapp.com/api/AhoyAgregator?kinopoisk=${kinopoisk_id}`).then((e) =>
        {
            navigate(`/view/${type_s}/${kinopoisk_id}/${title}`)
        })
    }

    function openSim(e)
    {
        navigate(`/similar/${href_id}/${id}`,
        {
            state:
            {
                type: type_s
            }
        });
    }

    return (

        <figure class="card card-with-hover">
        <img
        srcSet={srcset}
        alt="img24"
        />

    
    <figcaption class="card-caption">
      <div class="card-caption-content">
                                                      <LazyLoad
                                        placeholder={<Placeholder as="p" animation="glow"> <Placeholder xs={12} /> </Placeholder>}
                                        >
<ListGroup  style={{
    display: "block",
    maxWidth: "90vh",
    marginLeft: "auto",
    marginRight: "auto",
}}>
      <ListGroup.Item action onClick={SetLike}>
                     <Heart/> {likes}
      </ListGroup.Item>
      
      <ListGroup.Item><BarChartFill/> {rating}</ListGroup.Item>
      <ListGroup.Item><Calendar3/> {year}</ListGroup.Item>
          <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        меню
      </Dropdown.Toggle>

      <Dropdown.Menu>
            <Dropdown.Item
            eventKey="1"
      action onClick={openSim}>
      <Link/> similar
      </Dropdown.Item>
    {kinopoisk_id  ?
                 (
                     <Dropdown.Item eventKey="2"
                     action onClick={openPlayer}>
                         <PlayCircleFill/> open in player
                     </Dropdown.Item>
                 ) : null}
      </Dropdown.Menu>
    </Dropdown>

    </ListGroup>
                                            </LazyLoad>
        <Container style={{
  top: 10,
  bottom: 0,
  left: 0, 
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}
}>{title}</Container>
              
      </div>
    </figcaption>
  </figure>

    );
};

export default ElemCard;