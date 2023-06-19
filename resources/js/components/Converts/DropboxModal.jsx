import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DropboxModal = () => {
    const [show, setShow] = useState(false);
    const [driveInput, setDriveInput] = useState("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleChange = (event) => setDriveInput(event.target.value);

    const handleUpload = () => {
        // Implement your upload logic here
        console.log("Uploading to Dropbox:", driveInput);
        handleClose();
    };

    return (
        <>
            <img
                src="/images/icon/Vector3.png"
                alt="Click me"
                onClick={handleShow}
            />

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Dropbox</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        className="DriveURlInput"
                        type="text"
                        value={driveInput}
                        onChange={handleChange}
                        placeholder="Paste URL here..."
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpload}>
                        Upload
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DropboxModal;
