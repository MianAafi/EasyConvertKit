import React from "react";
import "./Styles/Cards.css";
function ConverterDoc() {
    return (
        <div>
            <div className="container">
                <h1 className="title-1 text-center">Why to Choose Us</h1>
                <div className="row mt-5">
                    <div
                        className="col-sm-6 col-lg-3 col-xs-12"
                        style={{ marginTop: "20px" }}
                    >
                        <div className="card card-body align-items-center h-100 shadow">
                            <div className="text-center">
                                <img
                                    src="/Images/Vector(8).png"
                                    className="card-img-top"
                                    alt="..."
                                    style={{}}
                                />
                            </div>
                            <div className="card-body">
                                <h5
                                    className="card-title text-center"
                                    style={{ color: "#7b61ff" }}
                                >
                                    Ease of Use
                                </h5>
                                <p className="card-text">
                                    Convert a file without needing to download
                                    any software. It will take just a few
                                    moments for you to get the file in the
                                    format.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-sm-6 col-lg-3 col-xs-12"
                        style={{ marginTop: "20px" }}
                    >
                        <div className="card card-body align-items-center h-100 shadow">
                            <div className="text-center">
                                <img
                                    src="/Images/Vector(9).png"
                                    className="card-img-top"
                                    alt="..."
                                    style={{}}
                                />
                            </div>
                            <div className="card-body">
                                <h5
                                    className="card-title"
                                    style={{ color: "#7b61ff" }}
                                >
                                    Privacy
                                </h5>
                                <p className="card-text">
                                    Files converted using our free service are
                                    permanently deleted within seven days. Our
                                    privacy policy can be read.
                                    {/* <a href="/privacy/">here</a>. */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-sm-6 col-lg-3 col-xs-12"
                        style={{ marginTop: "20px" }}
                    >
                        <div className="card card-body align-items-center h-100 shadow">
                            <div className="text-center">
                                <img
                                    src="/Images/Vector(10).png"
                                    className="card-img-top"
                                    alt="..."
                                    style={{}}
                                />
                            </div>
                            <div className="card-body">
                                <h5
                                    className="card-title"
                                    style={{ color: "#7b61ff" }}
                                >
                                    Quick
                                </h5>
                                <p className="card-text">
                                    We've deliberately kept our site free from
                                    ads and focus solely on file conversion,
                                    which means you get your files converted
                                    quickly.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-sm-6 col-lg-3 col-xs-12"
                        style={{ marginTop: "20px" }}
                    >
                        <div className="card card-body align-items-center h-100 shadow">
                            <div className="text-center">
                                <img
                                    src="/Images/Vector(11).png"
                                    className="card-img-top"
                                    alt="..."
                                    style={{}}
                                />
                            </div>
                            <div className="card-body">
                                <h5
                                    className="card-title text-center"
                                    style={{ color: "#7b61ff" }}
                                >
                                    Any Operating System
                                </h5>
                                <p className="card-text">
                                    Xlogic converts files on all platforms. We
                                    support Windows, Mac, Linux and everything
                                    in between. All you need is a web browser.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConverterDoc;
