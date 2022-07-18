import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";

import IframeResizer from 'iframe-resizer-react'




const Iplayer = ({ show, setShow, url, title,type,id }) => {



    const handleClose = (e) => {
        e.stopPropogation()
        setShow(false)};
    const handleShow = () => setShow(true);

    return (
        <Modal 
        enforceFocus={false}
        keyboard={false}
        centered
        restoreFocus={false}
        autoFocus={false}
        backdrop={false}
        show={show} 
        onHide={handleClose}
        fullscreen={"xxl-down"}>
            <Modal.Header closeButton>
                <Modal.Title onClick={(e)=>{
            e.stopPropogation()
        }}
                >{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body onClick={(e)=>{
            e.stopPropogation()
        }}>
            {type == 's' ? 
            <IframeResizer  onClick={(e)=>{
            e.stopPropogation()
        }}
            src={`https://music.yandex.ru/iframe/#artist/${id}`}
            style={{
                display: "block",       
                background: "#000",
                border: "none",         
                height: "100vh",        
                width: "100vw",
            }}
            frameborder="0">
            </IframeResizer>
            : null }
            {["h","m"].includes(type) ? 
            <IframeResizer  onClick={(e)=>{
            e.stopPropogation()
        }}
            style={{display: "block",
            background: "#000",
            border: "none",
            height: "100vh",
            width: "100vw"}
            }
            allow="fullscreen"
            src={url}
            />
            : null }



            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default Iplayer;