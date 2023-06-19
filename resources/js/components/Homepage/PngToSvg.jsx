import React from "react";
import "./Styles/PngToSvg.css";
const PngToSvg = () => {
    return (
        <>
            <section>
                <div className="container pngtosvg-contain">
                    <div className="row" style={{ alignItems: "center" }}>
                        <div className="col-md-6">
                            <h1 className="h1-t">
                                Convert your PNG image to an SVG for free.
                            </h1>
                            <p className="para-text">
                                Scalable Vector Graphics (SVG) is a vector file
                                format that is well-suited for the web. One
                                advantage of SVG is its ability to be resized
                                without sacrificing quality. In contrast, PNG
                                images can appear pixelated when enlarged beyond
                                their original size.
                            </p>
                            <div>
                                <button className="button-1" style={{}}>
                                    Upload your photo
                                </button>
                            </div>
                        </div>

                        <div
                            className="col-md-6 Parrot d-flex "
                            style={{ marginTop: "50px" }}
                        >
                            <div
                                className="ParrotL"
                                style={
                                    {
                                        // background: "#f5f5f5",
                                        // border: "1px solid #7b61ff",
                                        // borderRadius: "12px",
                                    }
                                }
                            >
                                <div
                                    className="box-1 bg-img-1 "
                                    style={{
                                        backgroundImage: "url(Images/a1.png)",
                                        transform: "rotate(8deg) scaleX(1)",

                                        marginTop: "50px",
                                    }}
                                >
                                    <div className="png" style={{}}>
                                        <div className="col">
                                            <div
                                                className="text"
                                                style={{
                                                    alignItems: "center",
                                                    marginTop: "50px",
                                                }}
                                            >
                                                <h1
                                                    className="text-png text-white"
                                                    style={{}}
                                                >
                                                    .Png
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="ParrotRotate"
                                style={{
                                    borderRadius: "275px",
                                    border: "2px solid #7B61FF",
                                }}
                            >
                                <img
                                    className="V-12"
                                    src="/Images/Vector(12).png"
                                    alt=""
                                />
                            </div>
                            <div className="ParrotR" style={{}}>
                                <div
                                    className="box-2 bg-img-2"
                                    style={{
                                        backgroundImage:
                                            "url(Images/bird2.png)",
                                    }}
                                >
                                    <div
                                        className="col"
                                        style={{
                                            paddingTop: "26px",
                                            marginLeft: "20px",
                                        }}
                                    >
                                        <div
                                            className="svg"
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                background: "#575353",
                                                opacity: "0.6",
                                                marginLeft: "25px",
                                                borderRadius: "12px",
                                                transform: "rotate(15.52deg)",
                                            }}
                                        >
                                            <div className="text">
                                                <h1
                                                    className="text-png"
                                                    style={{
                                                        width: "43px",
                                                        height: "29px",
                                                        fontFamily: "Open Sans",
                                                        fontStyle: "normal",
                                                        fontWeight: "700",
                                                        fontSize: "21px",
                                                        paddingTop: " 20px",
                                                        marginLeft: "10px",
                                                        color: "#FFFFFF",
                                                    }}
                                                >
                                                    .Svg
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PngToSvg;
