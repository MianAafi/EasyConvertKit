import React from "react";
// import Fileconversion from "./FileConversion";
// import Cards from "../components/Cards";
import PngToSvg from "./PngToSvg";
import PapularDocumentformat from "./PopularDocumentformate";
import ConverterDoc from "./ConverterDoc";
import Convert from "./Convert";
import Footer from "./Layout/Footer";

const Homepage = () => {
    return (
        <>
            <div className="container">{/* <Fileconversion /> */}</div>
            <div
                className="container-fluid"
                style={{
                    marginBottom: "30px",
                    background: " #f8f8f6",
                    fontFamily: "Open Sans",
                }}
            >
                <Convert />
            </div>
            <div className="container ">
                <PngToSvg />
            </div>
            <div className="container" style={{ marginTop: "50px" }}>
                {/* <Cards /> */}
                <ConverterDoc />
            </div>
            <div
                className="container-fluid p-0 m-0"
                style={{ marginTop: "50px", background: "#f8f8f6" }}
            >
                <PapularDocumentformat />
                <Footer />
            </div>
        </>
    );
};

export default Homepage;
