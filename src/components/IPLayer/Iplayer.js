import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";

import IframeResizer from 'iframe-resizer-react'




const Iplayer = ({ show, setShow, url, title }) => {



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
            <IframeResizer
            style={
                {
    display: "block",       /* iframes are inline by default */
    background: "#000",
    border: "none",         /* Reset default border */
    height: "100vh",        /* Viewport-relative units */
    width: "100vw",
}
            }
            allow="fullscreen"
  src={url}
/>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default Iplayer;