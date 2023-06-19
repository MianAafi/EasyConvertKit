import React from "react";
import "./Styles/Convert.css";
import { Container, Row, Col } from "react-bootstrap";

const Convert = () => {
    return (
        <>
            <Container>
                <Row style={{ width: "100%", margin: "0px" }}>
                    <div className="title">How To convert</div>
                    <div
                        className="vectors"
                        style={{
                            marginTop: "20px",
                            padding: "0px",
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}
                    >
                        {/* <div className="col-1 p-0"></div> */}
                        <Col lg={2} style={{ padding: "0px" }}>
                            <div className="Circle">
                                <div className="vector-img">
                                    <img
                                        className="circle-img"
                                        src="/Images/vector.png"
                                        alt=""
                                    />
                                    <h6 className="vector-text" style={{}}>
                                        Select
                                    </h6>
                                </div>
                            </div>
                            <div className="vector-para" style={{}}>
                                Choose a file from your computer that is less
                                than 10MB in size.
                            </div>
                        </Col>
                        <Col lg={2} style={{ padding: "0px" }}>
                            <div className="arrow-1 text-center">
                                <img
                                    className="arrow-img1"
                                    src="/Images/arrows.png"
                                    alt=""
                                    style={{
                                        transform: "matrix(1, 0, 0, -1, 0, 0)",
                                    }}
                                />
                            </div>
                        </Col>
                        <Col lg={2} style={{ padding: "0px" }}>
                            <div className="Circle">
                                <div className="vector-img">
                                    <img
                                        className="circle-img"
                                        src="/Images/Vector(1).png"
                                        alt=""
                                    />
                                    <h6 className="vector-text" style={{}}>
                                        Convert
                                    </h6>
                                </div>
                            </div>
                            <div className="vector-para" style={{}}>
                                The EasyConvertKit allows you to convert various
                                file types.
                            </div>
                        </Col>
                        <Col lg={2} style={{ padding: "0px" }}>
                            <div className="arrow-2 text-center">
                                <img
                                    className="arrow-img2"
                                    src="/Images/arrows.png"
                                    alt=""
                                />
                            </div>
                        </Col>
                        <Col lg={2} style={{ padding: "0px" }}>
                            <div className="Circle">
                                <div className="vector-img">
                                    <img
                                        className="circle-img"
                                        src="/Images/Vector(2).png"
                                        alt=""
                                    />
                                    <h6 className="vector-text" style={{}}>
                                        Download
                                    </h6>
                                </div>
                            </div>
                            <div className="vector-para" style={{}}>
                                Your new file is downloadable. Save it to make
                                it your own.
                            </div>
                        </Col>

                        {/* <div className="col-1 p-0"></div> */}
                    </div>
                    <hr
                        className="line"
                        style={{
                            padding: "0",
                            marginTop: "20px",
                            marginBottom: "20px",
                            fontSize: "20px",
                        }}
                    />
                    <div className="para" style={{ marginBottom: "50px" }}>
                        Welcome to EasyConvertKit, your go-to destination for
                        all your document conversion requirements. In today's
                        digital landscape, the need to convert file formats is
                        inevitable, especially with over 50 different formats
                        available. Microsoft alone has developed approximately
                        ten document file types, each boasting unique features
                        like compression, formatting, and portability. As
                        technology progresses, the number of document file
                        formats is expected to keep growing, thereby increasing
                        the demand for seamless conversion between formats. At
                        EasyConvertKit, we offer a comprehensive range of
                        conversion tools, allowing you to effortlessly and
                        efficiently convert your files whenever the need arises.
                        Experience the simplicity and reliability of
                        EasyConvertKit today and bid farewell to compatibility
                        issues and laborious manual conversions.
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Convert;
