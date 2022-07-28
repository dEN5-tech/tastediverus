import React, { useState,useEffect } from 'react';
import { Modal } from "react-bootstrap";
import {useLocation,useParams} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import axios from "axios";




import IframeResizer from 'iframe-resizer-react'




const IframePlayer = () => {
    const params = useParams()
    const loc = useLocation()
    const [IframeData,setIframeData]=  useState({})
    const [UrlIframe,setUrlIframe]=  useState(false)

    useEffect(()=>{
        if(params.type==="s"){
            setIframeData({
                id:params.id,
                type:params.type

            })
        }else{
            axios.get(`https://tastediverus.herokuapp.com/api/AhoyAgregator?kinopoisk=${params.id}`).then((e) => {
            setIframeData(e.data.data)
            document.title = `tastediverus | просмотр | ${params.title}`;
        })
            
            }
      
    },[])
    return (

        <div>
        {
            !UrlIframe ? <div style={{
            position: 'absolute',
            top: "50vh",
            left: "50vh",
            right: "50vh",
            bottom: "50vh",
            justifyContent: 'center', alignItems: 'center'}}>
          <h1
          style={{color:"white"}}
          >Выберите плеер</h1>
        </div> : null
        }
        
        {
            IframeData !=={} ?
            <ListGroup horizontal>
            {Object.keys(IframeData).map((elem)=>{
                if(Object.keys(IframeData[elem])[0])
                return <ListGroup.Item
            key={`${IframeData[elem].translate} (${IframeData[elem].quality})`}
                        action
                        onClick={(e)=>setUrlIframe(IframeData[elem].iframe)}>
                        {`${elem} (${IframeData[elem].translate||IframeData[elem].quality})`}
            </ListGroup.Item>
            })}
            </ListGroup> : null
        }
           {params.type == 's' ? 
            <IframeResizer  onClick={(e)=>{
            e.stopPropogation()
        }}
            src={`https://music.yandex.ru/iframe/#artist/${IframeData.id}`}
            style={{display: "block",
            background: "#000",
            border: "none",
            height: "90vh",
            width: "98vw"}
            }
            frameborder="0">
            </IframeResizer>
            : null }
            {["h","m"].includes(params.type) ? 
            <IframeResizer
            onClick={(e)=>{
            e.stopPropogation()
        }}
            style={{display: "block",
            background: "#000",
            border: "none",
            height: "90vh",
            width: "98vw"}
            }
            allow="fullscreen"
            src={UrlIframe}
            />
            : null } 
        </div>
            
    );
};

export default IframePlayer;