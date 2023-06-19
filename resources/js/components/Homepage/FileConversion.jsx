import { FaGoogleDrive } from "react-icons/fa";
import React, { useState } from "react";

import "./Styles/Conversion.css";

const Fileconversion = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    return (
        <>
            <div className="row ">
                <div className="col-md-12 text-center">
                    <h1
                        className="conversion"
                        style={{
                            marginTop: "20px",
                            fontFamily: "Open Sans",
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "40px",
                            lineHeight: "54px",
                            letterSpacing: "-0.04em",
                            color: "#7B61FF",
                        }}
                    >
                        File Conversion Made Easy
                    </h1>
                    <div className="para text-center">
                        <p
                            className="para"
                            style={{
                                top: "237px",
                                fontFamily: "Open Sans",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "24px",
                                color: "#252525",
                            }}
                        >
                            Convert Documents, Images, Vides & Sound - 100+
                            <br /> Farmates Supported
                        </p>
                    </div>
                </div>
            </div>
            <section>
                <div
                    className="container"
                    style={{ backgroundColor: "#f2f2f2" }}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <div
                                className="input-group"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Input with icons"
                                />
                                <div
                                    className="icon-container"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FaGoogleDrive className="icon" />
                                    <FaGoogleDrive className="icon" />
                                    <FaGoogleDrive className="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Fileconversion;
