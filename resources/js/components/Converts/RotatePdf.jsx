import React, { useState, useCallback, useEffect, useRef } from "react";
import axios, { Axios } from "axios";
import "../../../css/DocFileConvert.css";
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
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Rotate() {
    const [convertedFileSize, setConvertedFileSize] = useState(null);
    const [convertedFileUrl, setConvertedFileUrl] = useState(null);
    const [showConvertedFile, setShowConvertedFile] = useState(false);
    const [outputFormat, setOutputFormat] = useState("");
    const [conversionStatus, setConversionStatus] = useState("");
    const [file, setFile] = useState();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [count, setCount] = useState(0);
    // const [pageNo, setPageNo] = useState("");
    const [numPages, setNumPages] = useState(null);

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
        accept: ".pdf",
        multiple: false,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            setFileName(acceptedFiles[0].name);

            // const reader = new FileReader();
            // reader.readAsArrayBuffer(acceptedFiles[0]);
            // reader.onload = async () => {
            //     const pdf = await pdfjs.getDocument(reader.result).promise;
            //     setNumPages(pdf.numPages);
            // };
        },
    });

    // const { getRootProps, getInputProps, inputRef } = useDropzone({
    //     accept: ".pdf",
    //     multiple: false,
    //     onDrop: (acceptedFiles) => {
    //         setFile(acceptedFiles);
    //         setFileName(acceptedFiles.map((file) => file.name).join(", "));
    //     },
    // });
    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles);
    };

    const handleOutputFormatChange = (eventKey) => {
        setOutputFormat(eventKey);
    };

    const handleConvert = async () => {
        // Check if a file has been selected
        if (!file || file.length === 0) {
            Swal.fire("Please select file(s) to convert.");
            return;
        }

        Swal.fire({
            title: "Please wait",
            html: "Converting file...",
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const rotate = getCountText();
            const formData = new FormData();
            count;
            formData.append("rotate", rotate);
            // formData.append("pageNo", numPages);
            formData.append("file[]", file);

            for (let i = 0; i < file.length; i++) {
                formData.append("file[]", file[i]);
            }

            const response = await instance.post("/api/rotatePdf", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

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

    const handleRightClick = () => {
        setCount(count + 1);
    };

    const handleLeftClick = () => {
        setCount(count - 1);
    };

    const getCountText = () => {
        if (count > 0) {
            return `${count}`;
        } else {
            return `${count}`;
        }
    };
    // const handlePageNumberChange = (event) => {
    //     setPageNo(event.target.value);
    // };

    return (
        <>
            <Header />
            <div className="documentPage">
                <div className="banner">
                    <img src="/images/documents.PNG" alt="banner" />
                </div>
                <h1 className="heading-docx">Rotate PDF Document</h1>

                <div className="DocFileConverter h-100 shadow">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 p-0">
                            <label {...getRootProps()} className="upload-file">
                                {file ? (
                                    <p
                                        style={{
                                            whiteSpace: "nowrap",
                                            fontSize: "12px",
                                            margin: "0",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {fileName}
                                    </p>
                                ) : (
                                    <div>
                                        <i
                                            className="fa-solid fa-folder-arrow-up"
                                            style={{ marginRight: "8px" }}
                                        ></i>
                                        Upload
                                    </div>
                                )}
                            </label>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                            {file && (
                                <div>
                                    <button
                                        className="Left-btn"
                                        onClick={handleLeftClick}
                                    >
                                        <img
                                            src="/images/rotate-left.png"
                                            alt="left"
                                        />
                                    </button>
                                    <button
                                        className="Right-btn"
                                        onClick={handleRightClick}
                                    >
                                        <img
                                            src="/images/arrow.png"
                                            alt="left"
                                        />
                                    </button>
                                    {/* <p> {getCountText()}</p> */}
                                </div>
                            )}
                        </div>

                        {/* <div className="col-md-2 col-6">
                            <input
                                type="number"
                                placeholder="Enter total pages"
                                value={pageNo}
                                onChange={handlePageNumberChange}
                            />
                        </div> */}

                        <div className="col-md-4 p-0 ">
                            <Button
                                className="Convert-btn "
                                type="submit"
                                onClick={handleConvert}
                            >
                                Rotate Now
                            </Button>
                        </div>
                    </div>
                    {/* <div> {handleFileChange()}</div> */}
                    {conversionStatus && <p>{conversionStatus}</p>}
                </div>
                <div className="container ">
                    <div className="col-11 Download-btn  ">
                        {convertedFileUrl && (
                            <Card style={{ background: "" }}>
                                <Card.Body style={{ width: "100%" }}>
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
                <div className="row text-center d-flex justify-content-center">
                    {" "}
                    {file && (
                        <div className="col-12 PdfView d-flex justify-content-center ">
                            <Document file={file}>
                                <Page
                                    pageNumber={1}
                                    rotate={count * 90}
                                    width={150}
                                    height="auto"
                                    renderMode="canvas"
                                    renderTextLayer={false}
                                />
                            </Document>
                        </div>
                    )}
                </div>
                <ConverterDoc />
            </div>
            <Footer />
        </>
    );
}

export default Rotate;
