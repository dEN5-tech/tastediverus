import React, { useState,useEffect } from 'react';
import { Modal } from "react-bootstrap";
import {useLocation,useParams} from 'react-router-dom';

import IframeResizer from 'iframe-resizer-react'




const IframePlayer = () => {
    const params = useParams()
    const loc = useLocation()
    const [IframeData,setIframeData]=  useState({
        url:"",
        title:"",
        type:"",
        id:"",
    })


    useEffect(()=>{
        if(params.type==="s"){
            setIframeData({
                id:params.id,
                type:params.type

            })
        }else{
            console.log(loc.state)
              setIframeData({
                id:params.id,
                type:params.type,
                url:loc.state.url
            })  
            }
      
    },[])


    return (

        <div>
           {IframeData.type == 's' ? 
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
            {["h","m"].includes(IframeData.type) ? 
            <IframeResizer  onClick={(e)=>{
            e.stopPropogation()
        }}
            style={{display: "block",
            background: "#000",
            border: "none",
            height: "90vh",
            width: "98vw"}
            }
            allow="fullscreen"
            src={IframeData.url}
            />
            : null } 
        </div>
            
    );
};

export default IframePlayer;