import React, { useEffect, useRef, useState } from "react";
import "../Styles/Header.css";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        setShowDropdown((prevShowDropdown) => !prevShowDropdown);
    };
    const handleGoHome = () => {
        setFile(null);
        setConvertedFileUrl("");
        setFilePathList([]);
    };

    return (
        <div>
            <header>
                <div className="header-top">
                    <nav
                        className="navbar navbar-expand-lg"
                        style={{
                            background: "#7B61FF",
                        }}
                    >
                        <div
                            className="container "
                            style={{ padding: "0 12px" }}
                        >
                            <div
                                className="collapse navbar-collapse"
                                id="navbarNavAltMarkup"
                            >
                                <div className="navbar-nav justify-space-between">
                                    <Link
                                        className="nav-link active text-white"
                                        to="/"
                                    >
                                        API
                                    </Link>
                                    <Link
                                        className="nav-link  text-white"
                                        to="/"
                                    >
                                        FORMATES
                                    </Link>
                                    <Link
                                        className="nav-link text-white"
                                        to="/"
                                    >
                                        HELP
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <div className="lang">
                                    <Link
                                        className="d-flex"
                                        style={{ textDecoration: "none" }}
                                        role="search"
                                        to="/"
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <img
                                            src="/Images/Vector(3).png"
                                            alt=""
                                        />
                                        <span
                                            className="text-white"
                                            style={{ marginLeft: "5px" }}
                                        >
                                            ENG
                                            <img
                                                className="ml-2"
                                                src="/Images/whitedrop.png"
                                                alt=""
                                            />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <section>
                <nav className="navbar navbar-expand-lg navbar-2">
                    <div className="container" style={{ padding: "0 12px" }}>
                        <Link
                            className="navbar-brand"
                            to="/"
                            onClick={handleGoHome}
                            style={{ margin: "0px" }}
                        >
                            <img
                                src="/Images/Logo.png"
                                className="logo"
                                style={{ width: "150px" }}
                                alt=""
                            />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/">
                                        MY FILES
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Dropdown
                                        className="Dropdown-formatSelect"
                                        id="convert-list-dropdown"
                                    >
                                        <Dropdown.Toggle
                                            variant="none"
                                            id="dropdown-toggle"
                                            className="ConvertersList"
                                        >
                                            CONVERTER
                                            <img
                                                className="pl-2"
                                                src="/Images/nav2drop.png"
                                                alt="arrow"
                                            />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="Converters-dropdown">
                                            <div className="row row-1">
                                                <div className="col-lg-3 col-sm-6 col-12 p-0">
                                                    <Dropdown.Item className="select-file-converter">
                                                        <button className="converter-button">
                                                            <img
                                                                className="converter-img"
                                                                src="/Images/music.png"
                                                                alt=""
                                                            />
                                                            AUDIO CONVERTER
                                                        </button>
                                                    </Dropdown.Item>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12 p-0">
                                                    <Dropdown.Item className="select-file-converter">
                                                        <button className="converter-button">
                                                            <img
                                                                className="converter-img"
                                                                src="/Images/video.png"
                                                                alt=""
                                                            />
                                                            VIDEO CONVERTER
                                                        </button>
                                                    </Dropdown.Item>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12 p-0">
                                                    <Dropdown.Item className="select-file-converter">
                                                        <button className="converter-button">
                                                            <img
                                                                className="converter-img"
                                                                src="/Images/img.png"
                                                                alt=""
                                                            />
                                                            IMAGE CONVERTER
                                                        </button>
                                                    </Dropdown.Item>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12 p-0">
                                                    <Dropdown.Item className="select-file-converter">
                                                        <button className="converter-button">
                                                            <img
                                                                className="converter-img"
                                                                src="/Images/document.png"
                                                                alt=""
                                                            />
                                                            DOCUMENT CONVERTER
                                                        </button>
                                                    </Dropdown.Item>
                                                </div>
                                            </div>

                                            <div className="row row-2">
                                                <div className="col-lg-3 col-sm-6 col-12 p-0">
                                                    <Dropdown.Item className="select-file-converter ">
                                                        <button className="converter-button">
                                                            <img
                                                                className="converter-img"
                                                                src="/Images/archieve.png"
                                                                alt=""
                                                            />
                                                            ARCHIEVE CONVERTER
                                                        </button>
                                                    </Dropdown.Item>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12 p-0">
                                                    <Dropdown.Item className="select-file-converter ">
                                                        <button className="converter-button">
                                                            <img
                                                                className="converter-img"
                                                                src="/Images/presentation.png"
                                                                alt=""
                                                            />
                                                            PRESENTATION
                                                            CONVERTER
                                                        </button>
                                                    </Dropdown.Item>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12 p-0">
                                                    <Dropdown.Item className="select-file-converter">
                                                        <button className="converter-button">
                                                            <img
                                                                className="converter-img"
                                                                src="/Images/font.png"
                                                                alt=""
                                                            />
                                                            FONT CONVERTER
                                                        </button>
                                                    </Dropdown.Item>
                                                </div>
                                                <div className="col-lg-3 col-sm-6 col-12 p-0">
                                                    <Dropdown.Item className="select-file-converter">
                                                        <button className="converter-button">
                                                            <img
                                                                className="converter-img"
                                                                src="/Images/ebook.png"
                                                                alt=""
                                                            />
                                                            EBOOK CONVERTER
                                                        </button>
                                                    </Dropdown.Item>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/">
                                        PRICING
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    );
};

export default Header;
