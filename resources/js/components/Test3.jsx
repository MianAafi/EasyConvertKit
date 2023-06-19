import React, { useState, useCallback, useEffect, useRef } from "react";
import "../../css/Test.css";
import { useDropzone } from "react-dropzone";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import {
    Button,
    Modal,
    Dropdown,
    DropdownButton,
    ButtonGroup,
    Card,
} from "react-bootstrap";
import instance from "./api/instance";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Test3() {
    const [convertedFileSize, setConvertedFileSize] = useState(null);
    const [convertedFileUrl, setConvertedFileUrl] = useState(null);
    const [showConvertedFile, setShowConvertedFile] = useState(false);
    const [outputFormat, setOutputFormat] = useState("");
    const [conversionStatus, setConversionStatus] = useState("");
    const [file, setFile] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [uploadFileSize, setUploadFileSize] = useState(0);
    const [count, setCount] = useState(0);
    const [fileFormat, setFileFormat] = useState("");
    const [pageNumber, setPageNumber] = useState("");
    const [password, setPassword] = useState("");
    const [drop, setDrop] = useState();
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showGoogleDrive, setShowGoogleDrive] = useState(false);
    const [showDropbox, setShowDropbox] = useState(false);
    const [driveUrl, setDriveUrl] = useState("");
    const [dropBoxUrl, setDropBoxUrl] = useState("");
    const [filePathList, setFilePathList] = useState([]);
    const [fileNameList, setFileNameList] = useState([]);
    const [totalDiveSize, setTotalDiveSize] = useState(0);
    const [driveFileSize, setDriveFileSize] = useState(0);
    const [dropboxFileSize, setDropboxFileSize] = useState(0);
    const [dropFileSize, setDropFileSize] = useState(0);

    useEffect(() => {
        const handleDrop = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                setDrop(files);

                if (files.length === 1) {
                    const drop = files[0];
                    const fileName = drop.name;
                    setFileName(fileName);
                } else {
                    console.log(`Total files: ${files.length}`);
                }
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
    const handleChangeDrive = (event) => setDriveUrl(event.target.value);
    const handleChangeDropbox = (event) => setDropBoxUrl(event.target.value);

    const handleUploadDropbox = (service) => {
        console.log("Uploading to", service, ":", dropBoxUrl);
        Swal.fire({
            title: "Please wait",
            html: "Uploading DropBox file...",
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        instance
            .post("/api/dropBox", { dropBoxUrl: dropBoxUrl })
            .then((response) => {
                const filePath = response.data.filePath;
                var nameFile = response.data.fileName;
                const fileSize = response.data.fileSize;
                const fileSizeMB = parseFloat(response.data.fileSize);
                const totalSizeMB = fileSizeMB + parseFloat(dropboxFileSize);
                setDropboxFileSize(totalSizeMB.toFixed(2));
                const allfileSize =
                    parseFloat(totalSizeMB) +
                    parseFloat(dropFileSize) +
                    parseFloat(driveFileSize);
                setUploadFileSize(allfileSize);
                setFilePathList((prevFilePathList) => [
                    ...prevFilePathList,
                    filePath,
                ]);
                setFileNameList((prevFileNameList) => [
                    ...prevFileNameList,
                    nameFile,
                ]);
                let totalFileSize = file.length + filePathList.length + 1;
                if (file.length === 0 && filePathList.length === 0) {
                    setFileName(nameFile);
                } else {
                    setFileName(`${totalFileSize} Files Selected`);
                }
                const format = nameFile.split(".").pop();
                console.log(format);
                setFileFormat(format);
                Swal.close();
                Swal.fire({
                    title: "Success",
                    text: "File Uploaded Successfully.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                });
            })
            .catch((error) => {
                console.log(dropBoxUrl);
                Swal.close();
                Swal.fire({
                    title: "Error",
                    text: "Please try dropBox URL again.",
                    icon: "error",
                });
                console.error(error);
            });
        handleClose();
    };

    const handleUploadGoogleDrive = (service) => {
        console.log("Uploading to", service, ":", driveUrl);
        Swal.fire({
            title: "Please wait",
            html: "Uploading Google Drive file...",
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        instance
            .post("/api/googleDrive", { driveUrl: driveUrl })

            .then((response) => {
                const filePath = response.data.filePath;
                var nameFile = response.data.fileName;
                const fileSize = response.data.fileSize;

                const fileSizeMB = parseFloat(response.data.fileSize);
                const totalSizeMB = fileSizeMB + parseFloat(driveFileSize);
                setDriveFileSize(totalSizeMB.toFixed(2));

                const allfileSize =
                    parseFloat(totalSizeMB) +
                    parseFloat(dropFileSize) +
                    parseFloat(dropboxFileSize);
                setUploadFileSize(allfileSize);

                setFilePathList((prevFilePathList) => [
                    ...prevFilePathList,
                    filePath,
                ]);

                setFileNameList((prevFileNameList) => [
                    ...prevFileNameList,
                    nameFile,
                ]);

                let totalFileSize = file.length + filePathList.length + 1;

                // setFileName(nameFile);
                if (file.length === 0 && filePathList.length === 0) {
                    setFileName(nameFile);
                } else {
                    // console.log(file.length + filePathList.length);
                    setFileName(`${totalFileSize} Files Selected`);
                }
                // setFileName(nameFile);
                // setTotalDiveSize((prevTotalSize) => prevTotalSize + fileSize);
                // setTotalDiveSize(fileSize);
                // console.log((prevTotalSize) => prevTotalSize + fileSize);

                const format = nameFile.split(".").pop();
                setFileFormat(format);
                console.log(format);

                Swal.close();
                Swal.fire({
                    title: "Success",
                    text: "File Uploaded Successfully.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                });
            })
            .catch((error) => {
                console.log(driveUrl);
                Swal.close();
                Swal.fire(
                    "Error",
                    "Please try Google Drive Url again.",
                    "error"
                );
                console.error(error);
            });
        handleClose();
    };

    const { getRootProps, getInputProps, inputRef } = useDropzone({
        multiple: true,
        onDrop: (acceptedFiles) => {
            // console.log(file);
            // setFile(acceptedFiles);
            const updatedFiles = [...file, ...acceptedFiles];
            setFile(updatedFiles);
            // console.log(updatedFiles);
            // console.log(acceptedFiles);

            // Set file format
            const format = updatedFiles[0].name.split(".").pop();
            setFileFormat(format);
            // console.log(format);

            let totalSize = parseFloat(uploadFileSize);
            updatedFiles.forEach((file) => {
                totalSize += file.size;
            });

            const totalSizeInMB = (totalSize / 1000000).toFixed(2);
            setDropFileSize(totalSizeInMB);
            const allfileSize =
                parseFloat(totalSizeInMB) +
                parseFloat(driveFileSize) +
                parseFloat(dropboxFileSize);
            setUploadFileSize(allfileSize);
            // let totalSize = 0;
            // updatedFiles.forEach((file) => {
            //     totalSize += file.size;
            // });
            // const totalSizeInMB = (totalSize / 1000000).toFixed(2);
            // setUploadFileSize(totalSizeInMB + fileSize);
            // console.log(totalSizeInMB + fileSize);
            // console.log(fileSize + "ok");
            // Set file name
            // const totalFileSize = updatedFiles.length + filePathList.length;

            // if (updatedFiles.length === 1) {
            //     setFileName(updatedFiles[0].name);
            // } else {
            //     setFileName(`${totalFileSize} Files Selected`);
            // }
            let totalFileSize = updatedFiles.length + filePathList.length;
            // console.log(filePathList);
            // console.log("size all");
            // console.log(updatedFiles);
            // console.log(totalFileSize);

            if (updatedFiles.length === 1 && filePathList.length === 0) {
                setFileName(updatedFiles[0].name);
            } else {
                setFileName(`${totalFileSize} Files Selected`);
            }
        },
    });

    const onDrop = (acceptedFiles) => {
        const updatedFiles = [...file, ...acceptedFiles];
        setFile(updatedFiles);
    };
    const handleShowGoogleDrive = () => {
        setShowGoogleDrive(true);
        setShowDropbox(false);
    };

    const handleShowDropbox = () => {
        setShowDropbox(true);
        setShowGoogleDrive(false);
    };

    const handleClose = () => {
        setShowGoogleDrive(false);
        setShowDropbox(false);
        setDropBoxUrl("");
        setDriveUrl("");
    };

    const handleOutputFormatChange = (eventKey) => {
        setOutputFormat(eventKey);

        if (eventKey === "protect") {
            Swal.fire({
                title: "Enter Password",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off",
                    autocorrect: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Protect",
                cancelButtonText: "Cancel",
                showLoaderOnConfirm: true,
                preConfirm: (enteredPassword) => {
                    setPassword(enteredPassword);
                },
            });
        }
        if (eventKey === "extract") {
            Swal.fire({
                title: "Enter Page Number",
                input: "text",
                showCancelButton: true,
                confirmButtonText: "Set",
                preConfirm: (pageNumber) => {
                    const isValid = /^[0-9]+(-[0-9]+)?$/.test(pageNumber);
                    if (!isValid) {
                        Swal.showValidationMessage(
                            "Invalid input. Please enter a single number or a range (e.g., 1 or 1-2)."
                        );
                    }
                    return isValid ? pageNumber : "";
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const pageNumber = result.value;
                    setPageNumber(pageNumber);
                    console.log("Page Number:", pageNumber);
                }
            });
        }
    };
    useEffect(() => {
        console.log("hello");
        console.log(filePathList);
    }, [filePathList, fileNameList, totalDiveSize]);

    const handleConvert = async (selectedFile) => {
        // Check if a file has been selected

        if (!outputFormat) {
            Swal.fire("Please Choose a Format.");
            return;
        }
        // Check file and format to use accurate api
        let apiUrl;

        if (outputFormat === "pdf") {
            apiUrl = "/api/doc-to-pdf";
        } else if (outputFormat === "merge") {
            apiUrl = "/api/mergepdf";
            // if (file[0].type === "application/pdf" ) {
            //     apiUrl = "/api/mergepdf";
            // } else {
            //     Swal.fire("Please upload PDF files for merging.");
            //     return;
            // }
        } else if (outputFormat === "protect") {
            apiUrl = "/api/setPdfPassword";
            // if (file[0].type === "application/pdf") {
            //     apiUrl = "/api/setPdfPassword";
            // } else {
            //     Swal.fire("Please upload PDF files for merging.");
            //     return;
            // }
        } else if (outputFormat === "extract") {
            if (outputFormat === "extract") {
                apiUrl = "/api/extractPage";
            } else {
                console.log("Incomplete file due to mismatched page ranges.");
            }
            // if (file[0].type === "application/pdf") {
            //     apiUrl = "/api/extractPage";
            // } else {
            //     Swal.fire("Please upload PDF files for Extract.");
            //     return;
            // }
        } else if (outputFormat === "word") {
            apiUrl = "/api/pdfToWord";
            // if (file[0].type === "application/pdf") {
            //     apiUrl = "/api/pdfToWord";
            // } else {
            //     Swal.fire("Please upload PDF files for Word conversion.");
            //     return;
            // }
        } else if (outputFormat === "rotate") {
            apiUrl = "/api/rotatePdf";
            // if (file[0].type === "application/pdf") {
            //     apiUrl = "/api/rotatePdf";
            // } else {
            //     Swal.fire("Please upload PDF files to Rotate.");
            //     return;
            // }
        } else if (
            ((outputFormat === "jpg" ||
                outputFormat === "png" ||
                outputFormat === "svg") &&
                (file[0]?.type === "application/msword" ||
                    file[0]?.type ===
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) ||
            (file[0]?.type == null &&
                (filePathList[0]?.endsWith(".docx") ||
                    filePathList[0]?.endsWith(".doc")))
        ) {
            apiUrl = "/api/officeToImage";
        } else if (
            ((outputFormat === "jpg" ||
                outputFormat === "png" ||
                outputFormat === "svg") &&
                file[0]?.type === "application/vnd.ms-excel") ||
            file[0]?.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            (file[0]?.type == null &&
                (filePathList[0]?.endsWith(".xlsx") ||
                    filePathList[0]?.endsWith(".xls")))
        ) {
            // filePathList;
            apiUrl = "/api/officeToImage";
        } else if (
            ((outputFormat === "jpg" ||
                outputFormat === "png" ||
                outputFormat === "svg") &&
                file[0]?.type === "application/vnd.ms-powerpoint") ||
            file[0]?.type ===
                "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
            (file[0]?.type == null &&
                (filePathList[0]?.endsWith(".pptx") ||
                    filePathList[0]?.endsWith(".ppt")))
        ) {
            // console.log(fileNameList[0].format);
            apiUrl = "/api/officeToImage";
        } else if (
            outputFormat === "jpg" ||
            outputFormat === "png" ||
            outputFormat === "webp" ||
            outputFormat === "svg"
        ) {
            if (
                file[0]?.type === "application/pdf" ||
                file[0]?.type === "image/png" ||
                file[0]?.type === "image/jpeg" ||
                file[0]?.type === "image/jpg" ||
                file[0]?.type === "image/webp" ||
                file[0]?.type === "image/svg+xml" ||
                (file[0]?.type == null &&
                    (filePathList[0]?.endsWith(".pdf") ||
                        filePathList[0]?.endsWith(".png") ||
                        filePathList[0]?.endsWith(".jpeg") ||
                        filePathList[0]?.endsWith(".jpg") ||
                        filePathList[0]?.endsWith(".webp") ||
                        filePathList[0]?.endsWith(".svg")))
            ) {
                apiUrl = "/api/jpgtopng";
                console.log(apiUrl);
            } else {
                Swal.fire(
                    "Please upload PDF/JPG/PNG/WEBP/SVG files to convert."
                );

                return;
            }
        } else if (outputFormat === "split") {
            apiUrl = "/api/splitpdf";
            // if (file[0].type === "application/pdf") {
            //     apiUrl = "/api/splitpdf";
            // } else {
            //     Swal.fire("Please upload a PDF file for split.");
            //     return;
            // }
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
            const rotate = getCountText();
            const formData = new FormData();
            if (outputFormat === "protect") {
                formData.append("Password", password);
            } else if (outputFormat === "extract") {
                formData.append("pageNumber", pageNumber);
                console.log(pageNumber);
            } else if (outputFormat === "rotate") {
                formData.append("rotate", rotate);
            } else if (
                outputFormat === "jpg" ||
                outputFormat === "png" ||
                outputFormat === "webp" ||
                outputFormat === "svg"
            ) {
                // if (
                //     file[0].type === "application/msword" ||
                //     file[0].type ===
                //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                //     file[0].type === "application/vnd.ms-excel" ||
                //     file[0].type ===
                //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                //     file[0].type === "application/pdf" ||
                //     file[0].type === "application/vnd.ms-powerpoint" ||
                //     file[0].type ===
                //         "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                //     file[0].type === "image/png" ||
                //     file[0].type === "image/jpeg" ||
                //     file[0].type === "image/jpg" ||
                //     file[0].type === "image/webp" ||
                //     file[0].type === "image/svg+xml" ||
                //     file[0].type === "application/vnd.ms-powerpoint"
                // ) {
                formData.append("formet", `.${outputFormat}`);
                console.log(`.${outputFormat}`);
                // }
            }
            // if (filePathList.length >= 1) {
            //     formData.append("path[]", filePathList);
            //     formData.append("name[]", fileNameList);
            // }

            if (filePathList.length >= 1) {
                for (let i = 0; i < filePathList.length; i++) {
                    formData.append("path[]", filePathList[i]);
                    console.log(filePathList[i]);
                }
                for (let i = 0; i < fileNameList.length; i++) {
                    formData.append("name[]", fileNameList[i]);
                    console.log(fileNameList[i]);
                }
            }

            for (let i = 0; i < file.length; i++) {
                formData.append("file[]", file[i]);
            }

            console.log(apiUrl);

            if (outputFormat) {
                formData.append("outputFormat", outputFormat);
            }

            const response = await instance.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setConvertedFileUrl(response.data.url);
            setConvertedFileSize(response.data.size);
            Swal.close();
        } catch (error) {
            Swal.close();
            if (apiUrl === "/api/extractPage") {
                Swal.fire(
                    "Warning",
                    "Incomplete file due to mismatched page ranges.",
                    "warning"
                );
            } else {
                Swal.fire("Error", "Please Check input details.", "error");
                console.error(error);
            }
        }
    };
    // console.log(fileNameList);

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

    let icon;

    switch (fileFormat) {
        case "doc":
        case "docx":
        case "dotx":
            icon = "word.png";
            break;
        case "xls":
        case "xlsx":
            icon = "excel.png";
            break;
        case "webp":
            icon = "webp.png";
            break;
        case "svg":
            icon = "svg.png";
            break;
        case "ppt":
        case "pptx":
            icon = "ppt.png";
            break;
        case "jpg":
        case "jpeg":
        case "png":
            icon = "img.png";
            break;
        case "pdf":
            icon = "pdf.png";
            break;
        default:
            icon = "file.png";
    }

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

    const handleGoHome = () => {
        setFile([]);
        setConvertedFileUrl("");
        setFilePathList([]);
    };

    return (
        <>
            <div className="documentPage">
                <h1 className="heading-docx text-center">
                    File Conversion Made Easy
                </h1>
                <p className="heading-p text-center">
                    Convert documents, images, videos & sound - 100+ <br />{" "}
                    formats supported
                </p>
                {file.length === 0 && filePathList.length === 0 && (
                    <div className="Container UploadFile ">
                        <div className="row inner-convert">
                            <div className="col-7 p-0 ">
                                <label
                                    {...getRootProps()}
                                    className="upload-file"
                                >
                                    <i className="fa-solid fa-folder-arrow-up"></i>
                                    Choose your file
                                </label>
                            </div>

                            <div className="col-5 p-0 upload-icon">
                                <label {...getRootProps()}>
                                    <img
                                        className="upload-icon-first"
                                        src="Images/icon/Vector2.png"
                                        alt=""
                                    />{" "}
                                </label>
                                <div className="drop-icon-first">
                                    <img
                                        src="Images/icon/Vector3.png"
                                        alt="Click me"
                                        onClick={handleShowDropbox}
                                    />

                                    <Modal
                                        show={showDropbox}
                                        onHide={handleClose}
                                        centered
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Dropbox</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <input
                                                className="DriveURlInput"
                                                type="text"
                                                value={dropBoxUrl}
                                                onChange={handleChangeDropbox}
                                                placeholder="Paste URL here..."
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    handleUploadDropbox(
                                                        "Dropbox"
                                                    )
                                                }
                                            >
                                                Upload
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <div className="drive-icon-first">
                                    <img
                                        src="/Images/icon/Vector4.png"
                                        alt="Click me"
                                        onClick={handleShowGoogleDrive}
                                    />

                                    <Modal
                                        show={showGoogleDrive}
                                        onHide={handleClose}
                                        centered
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                Google Drive
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <input
                                                className="DriveURlInput"
                                                type="text"
                                                value={driveUrl}
                                                onChange={handleChangeDrive}
                                                placeholder="Paste URL here..."
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    handleUploadGoogleDrive(
                                                        "Google Drive"
                                                    )
                                                }
                                            >
                                                Upload
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <p className="convert-belowP">
                            Up to 10 files daily. (10 files remaining today), 50
                            MB each
                        </p>
                    </div>
                )}
                {!convertedFileUrl &&
                    (file.length > 0 || filePathList.length > 0) && (
                        <div className="container FileSelect-toConvert p-0">
                            <div className="row fileFormatrow p-0 m-0 ">
                                <div className="col-md-4 col-6 p-0 ">
                                    <p className="m-0 FileNameFormat">
                                        <img
                                            className="fileicon"
                                            src={`/Images/icon/${icon}`}
                                            alt={fileFormat}
                                        />{" "}
                                        {fileName}
                                    </p>
                                </div>
                                <div className="col-md-4 col-3 d-flex align-items-center justify-content-center p-0">
                                    <p className="m-0 pr-2 to">to </p>
                                    <div className="btn-group">
                                        <DropdownButton
                                            className="Dropdown-formatSelect "
                                            id="output-format-dropdown"
                                            title={
                                                outputFormat ? (
                                                    <>
                                                        <span className="mr-2 formatSelected">
                                                            {outputFormat.toUpperCase()}
                                                            <img
                                                                className="pl-2"
                                                                src="/Images/icon/arrowdown.png"
                                                                alt="arrow"
                                                            />
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span
                                                        className="ConvertTo"
                                                        style={{
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        ...
                                                        <img
                                                            className="pl-2"
                                                            src="/Images/icon/arrowdown.png"
                                                            alt="arrow"
                                                        />
                                                    </span>
                                                )
                                            }
                                            onSelect={handleOutputFormatChange}
                                        >
                                            {fileFormat === "pdf" && (
                                                <>
                                                    {" "}
                                                    <div
                                                        className="row  "
                                                        style={{
                                                            backgroundColor:
                                                                "#7B61FF",
                                                        }}
                                                    >
                                                        {" "}
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                <Dropdown.Item
                                                                    eventKey="jpg"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="jpg-tooltip"
                                                                    data-tooltip-content="Convert PNG,SVG,WEBP,PDF files to JPG."
                                                                >
                                                                    <button className="button-items">
                                                                        JPG
                                                                    </button>
                                                                </Dropdown.Item>{" "}
                                                                <Tooltip id="jpg-tooltip" />
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="png"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="png-tooltip"
                                                                    data-tooltip-content="Convert PDF,JPG,SVG,WEBP files to PNG."
                                                                >
                                                                    <button className="button-items">
                                                                        PNG
                                                                    </button>{" "}
                                                                    <Tooltip id="png-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                        {/* <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                <Dropdown.Item
                                                                    eventKey="svg"
                                                                    className="select-file-format"
                                                                >
                                                                    <button className="button-items">
                                                                        SVG
                                                                    </button>
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="webp"
                                                                    className="select-file-format"
                                                                >
                                                                    <button className="button-items">
                                                                        WEBP
                                                                    </button>
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div> */}
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                <Dropdown.Item
                                                                    eventKey="merge"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="merge-tooltip"
                                                                    data-tooltip-content="Merge your Multiple PDf files."
                                                                >
                                                                    <button className="button-items">
                                                                        MERGE
                                                                    </button>{" "}
                                                                    <Tooltip id="merge-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                <Dropdown.Item
                                                                    eventKey="word"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="word-tooltip"
                                                                    data-tooltip-content="Convert PDF file to WORD."
                                                                >
                                                                    <button className="button-items">
                                                                        WORD
                                                                    </button>{" "}
                                                                    <Tooltip id="word-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                        {((file.length === 1 &&
                                                            filePathList.length ===
                                                                0) ||
                                                            (file.length ===
                                                                0 &&
                                                                filePathList.length ===
                                                                    1)) && (
                                                            <div className="p-0">
                                                                <div
                                                                    className="col-12 p-0"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "row",
                                                                    }}
                                                                >
                                                                    <div className="col-6 p-0">
                                                                        <Dropdown.Item
                                                                            eventKey="rotate"
                                                                            className="select-file-format"
                                                                            data-tooltip-id="rotate-tooltip"
                                                                            data-tooltip-content="Rotate your PDF file."
                                                                        >
                                                                            <button className="button-items">
                                                                                ROTATE
                                                                            </button>{" "}
                                                                            <Tooltip id="rotate-tooltip" />
                                                                        </Dropdown.Item>
                                                                    </div>
                                                                    <div className="col-6 p-0">
                                                                        {" "}
                                                                        <Dropdown.Item
                                                                            eventKey="protect"
                                                                            className="select-file-format"
                                                                            data-tooltip-id="protect-tooltip"
                                                                            data-tooltip-content="Make your PDF file Password Protected"
                                                                        >
                                                                            <button className="button-items">
                                                                                PROTECT
                                                                            </button>{" "}
                                                                            <Tooltip id="protect-tooltip" />
                                                                        </Dropdown.Item>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="col-12 p-0"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "row",
                                                                    }}
                                                                >
                                                                    <div className="col-6 p-0">
                                                                        {" "}
                                                                        <Dropdown.Item
                                                                            eventKey="split"
                                                                            className="select-file-format"
                                                                            data-tooltip-id="split-tooltip"
                                                                            data-tooltip-content="Split PDF file Pages."
                                                                        >
                                                                            <button className="button-items">
                                                                                SPLIT
                                                                            </button>{" "}
                                                                            <Tooltip id="split-tooltip" />
                                                                        </Dropdown.Item>
                                                                    </div>
                                                                    <div className="col-6 p-0">
                                                                        {" "}
                                                                        <Dropdown.Item
                                                                            eventKey="extract"
                                                                            className="select-file-format"
                                                                            data-tooltip-id="extract-tooltip"
                                                                            data-tooltip-content="Extract PDF file single or multiple Pages"
                                                                        >
                                                                            <button className="button-items">
                                                                                EXTRACT
                                                                            </button>{" "}
                                                                            <Tooltip id="extract-tooltip" />
                                                                        </Dropdown.Item>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                            {(fileFormat === "jpg" ||
                                                fileFormat === "jpeg") && (
                                                <>
                                                    <div
                                                        className="row "
                                                        style={{
                                                            backgroundColor:
                                                                "#7B61FF",
                                                        }}
                                                    >
                                                        {" "}
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="pdf"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="pdf-tooltip"
                                                                    data-tooltip-content="Convert files to PDF"
                                                                >
                                                                    <button className="button-items">
                                                                        PDF
                                                                    </button>{" "}
                                                                    <Tooltip id="pdf-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="svg"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="svg-tooltip"
                                                                    data-tooltip-content="Convert PNG,JPG,WEBP,PDF files to SVG."
                                                                >
                                                                    <button className="button-items">
                                                                        SVG
                                                                    </button>{" "}
                                                                    <Tooltip id="svg-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>{" "}
                                                        </div>
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="webp"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="webp-tooltip"
                                                                    data-tooltip-content="Convert PNG,SVG,JPG files to WEBP"
                                                                >
                                                                    <button className="button-items">
                                                                        WEBP
                                                                    </button>{" "}
                                                                    <Tooltip id="webp-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>

                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="png"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="png-tooltip"
                                                                    data-tooltip-content="Convert JPG,SVG,WEBP,PDF files to PNG"
                                                                >
                                                                    <button className="button-items">
                                                                        PNG
                                                                    </button>{" "}
                                                                    <Tooltip id="png-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {fileFormat !== "pdf" &&
                                                [
                                                    "odt",
                                                    "txt",
                                                    "csv",
                                                    "db",
                                                    "odf",
                                                    "odg",
                                                    "odp",
                                                    "ods",
                                                    "otg",
                                                    "otp",
                                                    "ots",
                                                    "ott",
                                                    "oxt",
                                                    "wdb",
                                                    "wps",
                                                ].includes(fileFormat) && (
                                                    <div className="col-12 p-0">
                                                        <Dropdown.Item
                                                            eventKey="pdf"
                                                            className="select-file-format"
                                                            data-tooltip-id="pdf-tooltip"
                                                            data-tooltip-content="Convert files to PDF"
                                                        >
                                                            <button className="button-items">
                                                                PDF
                                                            </button>{" "}
                                                            <Tooltip id="pdf-tooltip" />
                                                        </Dropdown.Item>
                                                    </div>
                                                )}

                                            {(fileFormat === "png" ||
                                                fileFormat === "PNG") && (
                                                <>
                                                    {" "}
                                                    <div
                                                        className="row "
                                                        style={{
                                                            backgroundColor:
                                                                "#7B61FF",
                                                        }}
                                                    >
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                <Dropdown.Item
                                                                    eventKey="pdf"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="pdf-tooltip"
                                                                    data-tooltip-content="Convert files to PDF"
                                                                >
                                                                    <button className="button-items">
                                                                        PDF
                                                                    </button>
                                                                    <Tooltip id="pdf-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="svg"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="svg-tooltip"
                                                                    data-tooltip-content="Convert PNG,JPG,WEBP files to SVG"
                                                                >
                                                                    <button className="button-items">
                                                                        SVG
                                                                    </button>
                                                                    <Tooltip id="svg-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="webp"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="webp-tooltip"
                                                                    data-tooltip-content="Convert PNG,SVG,JPG files to WEBP"
                                                                >
                                                                    <button className="button-items">
                                                                        WEBP
                                                                    </button>
                                                                    <Tooltip id="webp-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="jpg"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="jpg-tooltip"
                                                                    data-tooltip-content="Convert PNG,SVG,WEBP,PDF files to JPG"
                                                                >
                                                                    <button className="button-items">
                                                                        JPG
                                                                    </button>{" "}
                                                                    <Tooltip id="jpg-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {(fileFormat === "docx" ||
                                                fileFormat === "doc" ||
                                                fileFormat === "dotx" ||
                                                fileFormat === "xlsx" ||
                                                fileFormat === "xls" ||
                                                fileFormat === "pptx" ||
                                                fileFormat === "ppt") && (
                                                <>
                                                    <div
                                                        className="row "
                                                        style={{
                                                            backgroundColor:
                                                                "#7B61FF",
                                                        }}
                                                    >
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                <Dropdown.Item
                                                                    eventKey="pdf"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="pdf-tooltip"
                                                                    data-tooltip-content="Convert files to PDF"
                                                                >
                                                                    <button className="button-items ">
                                                                        PDF
                                                                    </button>
                                                                    <Tooltip id="pdf-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="png"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="png-tooltip"
                                                                    data-tooltip-content="Convert JPG,SVG,WEBP,PDF files to PNG"
                                                                >
                                                                    <button className="button-items">
                                                                        PNG
                                                                    </button>
                                                                    <Tooltip id="png-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            {/* <div className="col-6 p-0">
                                                                <Dropdown.Item
                                                                    eventKey="svg"
                                                                    className="select-file-format"
                                                                >
                                                                    <button className="button-items">
                                                                        SVG
                                                                    </button>
                                                                </Dropdown.Item>
                                                            </div> */}
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="jpg"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="jpg-tooltip"
                                                                    data-tooltip-content="Convert PNG,SVG,WEBP,PDF files to JPG"
                                                                >
                                                                    <button className="button-items">
                                                                        JPG
                                                                    </button>
                                                                    <Tooltip id="jpg-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {fileFormat === "svg" && (
                                                <>
                                                    <div
                                                        className="row "
                                                        style={{
                                                            backgroundColor:
                                                                "#7B61FF",
                                                        }}
                                                    >
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="pdf"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="pdf-tooltip"
                                                                    data-tooltip-content="Convert files to PDF"
                                                                >
                                                                    <button className="button-items">
                                                                        PDF
                                                                    </button>
                                                                    <Tooltip id="pdf-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="png"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="png-tooltip"
                                                                    data-tooltip-content="Convert JPG,SVG,WEBP,PDF files to PNG"
                                                                >
                                                                    <button className="button-items">
                                                                        PNG
                                                                    </button>
                                                                    <Tooltip id="png-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="webp"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="webp-tooltip"
                                                                    data-tooltip-content="Convert PNG,SVG,JPG files to WEBP"
                                                                >
                                                                    <button className="button-items">
                                                                        WEBP
                                                                    </button>
                                                                    <Tooltip id="webp-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="jpg"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="jpg-tooltip"
                                                                    data-tooltip-content="Convert PNG,SVG,WEBP,PDF files to JPG"
                                                                >
                                                                    <button className="button-items">
                                                                        JPG
                                                                    </button>{" "}
                                                                    <Tooltip id="jpg-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {fileFormat === "webp" && (
                                                <>
                                                    <div
                                                        className="row "
                                                        style={{
                                                            backgroundColor:
                                                                "#7B61FF",
                                                        }}
                                                    >
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="pdf"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="pdf-tooltip"
                                                                    data-tooltip-content="Convert files to PDF"
                                                                >
                                                                    <button className="button-items">
                                                                        PDF
                                                                    </button>
                                                                    <Tooltip id="pdf-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="png"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="png-tooltip"
                                                                    data-tooltip-content="Convert JPG,SVG,WEBP,PDF files to PNG"
                                                                >
                                                                    <button className="button-items">
                                                                        PNG
                                                                    </button>
                                                                    <Tooltip id="png-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-12 p-0"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <div className="col-6 p-0">
                                                                {" "}
                                                                <Dropdown.Item
                                                                    eventKey="svg"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="svg-tooltip"
                                                                    data-tooltip-content="Convert PNG,JPG,WEBP files to SVG"
                                                                >
                                                                    <button className="button-items">
                                                                        SVG
                                                                    </button>
                                                                    <Tooltip id="svg-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                                <Dropdown.Item
                                                                    eventKey="jpg"
                                                                    className="select-file-format"
                                                                    data-tooltip-id="jpg-tooltip"
                                                                    data-tooltip-content="Convert PNG,SVG,WEBP,PDF files to JPG"
                                                                >
                                                                    <button className="button-items">
                                                                        JPG
                                                                    </button>
                                                                    <Tooltip id="jpg-tooltip" />
                                                                </Dropdown.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </DropdownButton>
                                    </div>
                                </div>

                                <div className="col-md-4 col-3  p-0 ,-0 ">
                                    <p className=" FileSizeFormat">
                                        {uploadFileSize.toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            {outputFormat === "rotate" && (
                                <div className="row text-center d-flex justify-content-center">
                                    {/* <div className="col-md-2"></div> */}
                                    <div className="col-6 PdfView   ">
                                        <Document
                                            file={
                                                file.length === 1
                                                    ? file[0]
                                                    : file.length === 0
                                                    ? "public/storage/allFiles/" +
                                                      filePathList[0]
                                                    : null
                                            }
                                        >
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
                                    <div className="col-6 d-flex flex-column align-items-center justify-content-center">
                                        <button
                                            className="Left-btn"
                                            onClick={handleLeftClick}
                                        >
                                            <img
                                                src="/Images/rotate-left.png"
                                                alt="left"
                                            />
                                            <span>Left</span>
                                        </button>

                                        <button
                                            className="Right-btn"
                                            onClick={handleRightClick}
                                        >
                                            <img
                                                src="/Images/arrow.png"
                                                alt="left"
                                            />{" "}
                                            <span>Right</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="row AddMore ">
                                <div className="col-lg-7 col-6 AddMoreFile">
                                    <div className="dropdown">
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                className="btn btn-light addFilebtn"
                                                id="fileDropdown"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    borderRadius: "0px",
                                                }}
                                            >
                                                <i
                                                    className="fa-solid fa-plus fa-lg"
                                                    style={{ color: "#7b61ff" }}
                                                ></i>
                                                <span className="addFile">
                                                    {" "}
                                                    Add More Files
                                                </span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-add">
                                                <Dropdown.Item
                                                    className="dropG"
                                                    href="#google-drive"
                                                    onClick={
                                                        handleShowGoogleDrive
                                                    }
                                                >
                                                    <img
                                                        src="/Images/icon/Vector4.png"
                                                        alt="Drive"
                                                    />{" "}
                                                    <span>
                                                        {" "}
                                                        From Google Drive{" "}
                                                    </span>
                                                </Dropdown.Item>
                                                <Modal
                                                    show={showGoogleDrive}
                                                    onHide={handleClose}
                                                    centered
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>
                                                            Google Drive
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <input
                                                            className="DriveURlInput"
                                                            type="text"
                                                            value={driveUrl}
                                                            onChange={
                                                                handleChangeDrive
                                                            }
                                                            placeholder="Paste URL here..."
                                                        />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() =>
                                                                handleUploadGoogleDrive(
                                                                    "Google Drive"
                                                                )
                                                            }
                                                        >
                                                            Upload
                                                        </Button>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={
                                                                handleClose
                                                            }
                                                        >
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                <Dropdown.Item
                                                    className="dropD"
                                                    href="#dropbox"
                                                    onClick={handleShowDropbox}
                                                >
                                                    <img
                                                        src="/Images/icon/Vector3.png"
                                                        alt="Dropbox"
                                                    />{" "}
                                                    From DropBox
                                                </Dropdown.Item>
                                                <Modal
                                                    show={showDropbox}
                                                    onHide={handleClose}
                                                    centered
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>
                                                            Dropbox
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <input
                                                            className="DriveURlInput"
                                                            type="text"
                                                            value={dropBoxUrl}
                                                            onChange={
                                                                handleChangeDropbox
                                                            }
                                                            placeholder="Paste URL here..."
                                                        />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() =>
                                                                handleUploadDropbox(
                                                                    "Dropbox"
                                                                )
                                                            }
                                                        >
                                                            Upload
                                                        </Button>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={
                                                                handleClose
                                                            }
                                                        >
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                <label {...getRootProps()}>
                                                    <Dropdown.Item
                                                        className="dropU"
                                                        href="#upload-file"
                                                    >
                                                        <img
                                                            src="/Images/up2.png"
                                                            alt="add file"
                                                        />{" "}
                                                        Choose File
                                                    </Dropdown.Item>
                                                </label>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-2 col-2 drivedropicons ">
                                    <img
                                        src="/Images/icon/Vector3.png"
                                        alt="Click me"
                                        onClick={handleShowDropbox}
                                    />{" "}
                                    <Modal
                                        show={showDropbox}
                                        onHide={handleClose}
                                        centered
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Dropbox</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <input
                                                className="DriveURlInput"
                                                type="text"
                                                value={dropBoxUrl}
                                                onChange={handleChangeDropbox}
                                                placeholder="Paste URL here..."
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    handleUploadDropbox(
                                                        "Dropbox"
                                                    )
                                                }
                                            >
                                                Upload
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <div className="drop-icon"></div>
                                    <img
                                        src="/Images/icon/Vector4.png"
                                        alt="Click me"
                                        onClick={handleShowGoogleDrive}
                                    />
                                    <Modal
                                        show={showGoogleDrive}
                                        onHide={handleClose}
                                        centered
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                Google Drive
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <input
                                                className="DriveURlInput"
                                                type="text"
                                                value={driveUrl}
                                                onChange={handleChangeDrive}
                                                placeholder="Paste URL here..."
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    handleUploadGoogleDrive(
                                                        "Google Drive"
                                                    )
                                                }
                                            >
                                                Upload
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                {outputFormat ? (
                                    <button
                                        className="col-lg-3 col-4 ConvertNow"
                                        onClick={handleConvert}
                                    >
                                        {[
                                            "merge",
                                            "rotate",
                                            "protect",
                                            "split",
                                            "extract",
                                        ].includes(outputFormat.toLowerCase())
                                            ? `${outputFormat.toUpperCase()} PDF `
                                            : `Convert to ${outputFormat.toUpperCase()} `}
                                        <span>
                                            <i
                                                id="arrowC"
                                                className="fa-solid fa-arrow-right-long fa-lg"
                                                style={{ color: "#7b61ff" }}
                                            ></i>
                                        </span>
                                    </button>
                                ) : (
                                    <div className="noConvert col-lg-3 col-4"></div>
                                )}

                                {/* <button
                                    className="col-md-3 col-4 ConvertNow"
                                    onClick={handleConvert}
                                >
                                    {outputFormat} Now{" "}
                                    <span>
                                        <i
                                            id="arrowC"
                                            className="fa-solid fa-arrow-right-long fa-lg"
                                            style={{ color: "#7b61ff" }}
                                        ></i>
                                    </span>
                                </button> */}
                            </div>
                        </div>
                    )}

                {convertedFileUrl && (
                    <div className="row Download p-0 ">
                        <div className=" Download-btn ">
                            <Card style={{ borderRadius: "0px" }}>
                                <Card.Body className="p-0">
                                    <div className="col-12 d-flex align-items-center justify-content-between p-0 ">
                                        <p className="fileSizeconverted">
                                            File size: {convertedFileSize}
                                            MB{" "}
                                            <span
                                                style={{
                                                    color: "#7b61ff",
                                                    paddingLeft: "10px",
                                                }}
                                            >
                                                Finished
                                            </span>
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
                        </div>

                        <div className="col-12 ConvertMoreFile">
                            <div className="dropdown convertextraFile">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="btn btn-light addFilebtnend"
                                        id="fileDropdown"
                                        style={{
                                            borderRadius: "0px",
                                        }}
                                        onClick={handleGoHome}
                                    >
                                        <i
                                            className="fa-solid fa-plus fa-lg"
                                            style={{ color: "#7b61ff" }}
                                        ></i>
                                        <span className="addFile">
                                            {" "}
                                            Back to Convert More Files
                                        </span>
                                    </Dropdown.Toggle>
                                    {/* <Dropdown.Menu className="dropdown-menu-add">
                                        <Dropdown.Item
                                            className="dropG"
                                            href="#google-drive"
                                            onClick={handleShowGoogleDrive}
                                        >
                                            <img
                                                src="/Images/icon/Vector4.png"
                                                alt="Drive"
                                            />{" "}
                                            <span> From Google Drive </span>
                                        </Dropdown.Item>
                                        <Modal
                                            show={showGoogleDrive}
                                            onHide={handleClose}
                                            centered
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>
                                                    Google Drive
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <input
                                                    className="DriveURlInput"
                                                    type="text"
                                                    value={driveUrl}
                                                    onChange={handleChangeDrive}
                                                    placeholder="Paste URL here..."
                                                />
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button
                                                    variant="primary"
                                                    onClick={() =>
                                                        handleUploadGoogleDrive(
                                                            "Google Drive"
                                                        )
                                                    }
                                                >
                                                    Upload
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={handleClose}
                                                >
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Dropdown.Item
                                            className="dropD"
                                            href="#dropbox"
                                            onClick={handleShowDropbox}
                                        >
                                            <img
                                                src="/Images/icon/Vector3.png"
                                                alt="Dropbox"
                                            />{" "}
                                            From DropBox
                                        </Dropdown.Item>
                                        <Modal
                                            show={showDropbox}
                                            onHide={handleClose}
                                            centered
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>
                                                    Dropbox
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <input
                                                    className="DriveURlInput"
                                                    type="text"
                                                    value={dropBoxUrl}
                                                    onChange={
                                                        handleChangeDropbox
                                                    }
                                                    placeholder="Paste URL here..."
                                                />
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button
                                                    variant="primary"
                                                    onClick={() =>
                                                        handleUploadDropbox(
                                                            "Dropbox"
                                                        )
                                                    }
                                                >
                                                    Upload
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={handleClose}
                                                >
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <label {...getRootProps()}>
                                            <Dropdown.Item
                                                className="dropU"
                                                href="#upload-file"
                                            >
                                                <img
                                                    src="/Images/up2.png"
                                                    alt="Dropbox"
                                                />{" "}
                                                Choose File
                                            </Dropdown.Item>
                                        </label>
                                    </Dropdown.Menu> */}
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                )}

                <p className="below-convert-P">
                    Converted <span style={{ fontWeight: "700" }}>1000+</span>{" "}
                    files Which has 10GB Storage
                </p>
            </div>
        </>
    );
}

export default Test3;
