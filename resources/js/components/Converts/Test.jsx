import React, { useState, useCallback, useEffect, useRef } from "react";
import axios, { Axios } from "axios";
// import "../../../css/DocFileConvert.css";
import "../../../css/Test.css";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import {
    Button,
    Dropdown,
    DropdownButton,
    ButtonGroup,
    Card,
} from "react-bootstrap";
import instance from "../api/instance";
import Header from "../Header";
import Footer from "../Footer";
import ConverterDoc from "../ConverterDoc";

function Test() {
    const [convertedFileSize, setConvertedFileSize] = useState(null);
    const [convertedFileUrl, setConvertedFileUrl] = useState(null);
    const [showConvertedFile, setShowConvertedFile] = useState(false);
    const [outputFormat, setOutputFormat] = useState("");
    const [conversionStatus, setConversionStatus] = useState("");
    const [file, setFile] = useState();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        const handleDrop = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const file = event.dataTransfer.files[0];
            if (file) {
                setFile(file);
            }
        };
        const handleDragOver = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        window.addEventListener("drop", handleDrop);
        window.addEventListener("dragover", handleDragOver);
        return () => {
            window.removeEventListener("drop", handleDrop);
            window.removeEventListener("dragover", handleDragOver);
        };
    }, []);

    const { getRootProps, getInputProps, inputRef } = useDropzone({
        accept: ".doc,.docs",
        multiple: true,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles);
            // setFileName(acceptedFiles.map((file) => file.name).join(", "));
            if (acceptedFiles.length === 1) {
                setFileName(acceptedFiles[0].name);
            } else {
                setFileName(`${acceptedFiles.length} files`);
            }
        },
    });
    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles);
    };

    const handleOutputFormatChange = (eventKey) => {
        setOutputFormat(eventKey);
    };

    const handleConvert = async (selectedFile) => {
        // Check if a file has been selected
        if (!file || file.length === 0) {
            Swal.fire("Please select file(s) to convert.");
            return;
        }

        // Display a progress indicator
        Swal.fire({
            title: "Please wait",
            html: "Converting file...",
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const formData = new FormData();
            // formData.append("file", file);
            // formData.append("filename", "output");
            console.log(file);
            // return;
            for (let i = 0; i < file.length; i++) {
                formData.append("file[]", file[i]);
                // formData.append("filename", `output${i}`);
            }

            if (outputFormat) {
                formData.append("outputFormat", outputFormat);
            }
            // console.log(outputFormat);
            console.log(file);
            // console.log(formData);

            const response = await instance.post("/api/doc-to-pdf", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
            console.log(response.data.url);
            console.log(response.data.size);
            setConvertedFileUrl(response.data.url);
            setConvertedFileSize(response.data.size);

            Swal.close();
        } catch (error) {
            Swal.close();
            Swal.fire("Error", "Error converting api file.", "error");
            console.error(error);
        }
    };

    useEffect(() => {
        const handleDragEnter = () => {
            setIsDragging(true);
        };
        const handleDragLeave = () => {
            setIsDragging(false);
        };
        const handleDrop = (event) => {
            setIsDragging(false);
            const file = event.dataTransfer.files[0];
            if (file) {
                setSelectedFile(file);
            }
        };
        document.body.addEventListener("dragenter", handleDragEnter);
        document.body.addEventListener("dragleave", handleDragLeave);
        document.body.addEventListener("drop", handleDrop);
        return () => {
            document.body.removeEventListener("dragenter", handleDragEnter);
            document.body.removeEventListener("dragleave", handleDragLeave);
            document.body.removeEventListener("drop", handleDrop);
        };
    }, []);

    const handleDownload = () => {
        if (convertedFileUrl) {
            window.location.href =
                window.location.origin + "/" + convertedFileUrl;
        }
    };
    // useEffect(() => {
    //     if (file) {
    //         handleConvert();
    //     }
    // }, [file]);
    useEffect(() => {
        let timeoutId;

        if (file) {
            timeoutId = setTimeout(handleConvert, 500);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [file]);

    return (
        <>
            <div className="documentPage">
                <h1 className="heading-docx">Document Converter Word to PDF</h1>
                <p className="text-center">
                    Convert documents, images, videos & sound - 100+ <br />{" "}
                    formats supported
                </p>
                <div className="DocFile_Converter h-100 shadow">
                    {convertedFileUrl ? (
                        <div
                            className={`row  ${convertedFileUrl ? "" : "hide"}`}
                        >
                            <div className="col-12 Download-btn ">
                                {convertedFileUrl && (
                                    <Card>
                                        <Card.Body
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                            }}
                                        >
                                            <div className="col-12 d-flex align-items-center justify-content-md-between p-2">
                                                <p className="m-0">
                                                    Converted file size:{" "}
                                                    {convertedFileSize}MB
                                                </p>
                                                <Button
                                                    className="btn-custom"
                                                    onClick={handleDownload}
                                                >
                                                    Download
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`row inner-convert ${
                                convertedFileUrl ? "hide" : ""
                            }`}
                        >
                            <div className="col-md-7 col-sm-12 p-0">
                                <label
                                    {...getRootProps()}
                                    className="upload-file"
                                >
                                    {file ? (
                                        <p
                                            style={{
                                                whiteSpace: "nowrap",
                                                paddingLeft: "5px",
                                                margin: "0",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {fileName}
                                        </p>
                                    ) : (
                                        <div>
                                            <i className="fa-solid fa-folder-arrow-up"></i>
                                            Choose your file
                                        </div>
                                    )}
                                </label>
                            </div>

                            <div className="col-md-5 p-0 upload-icon ">
                                <img src="/images/icon/Vector2.png" alt="" />
                                <img src="/images/icon/Vector3.png" alt="" />
                                <img src="/images/icon/Vector4.png" alt="" />
                            </div>
                        </div>
                    )}

                    <p className="convert-belowP">
                        Up to 10 files daily. (10 files remaining today), 50 MB
                        each
                    </p>
                    {conversionStatus && <p>{conversionStatus}</p>}
                </div>
                <p className="below-convert-P">
                    Converted <span style={{ fontWeight: "700" }}>1000+</span>{" "}
                    files Which has 10GB Storage
                </p>
            </div>
        </>
    );
}

export default Test;
