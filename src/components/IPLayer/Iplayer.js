import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";

import IframeResizer from 'iframe-resizer-react'




const Iplayer = ({ show, setShow, url, title,type }) => {



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal 
        show={show} 
        onHide={handleClose}
        fullscreen={true}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {type == 's' ? 
            <IframeResizer
            src="https://music.yandex.ru/iframe/#artist/1151"
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
            <IframeResizer
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