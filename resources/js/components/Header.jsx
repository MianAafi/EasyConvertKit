import React from "react";
import "../../css/Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <div className="App ">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow-sm ">
                    <div className="container ">
                        <div>
                            <a className="navbar-brand" href="/">
                                <img
                                    src="/images/xlogic.png"
                                    alt="logo"
                                    width="214"
                                    height="50"
                                />
                            </a>
                        </div>
                        <div className="d-flex flex-row-reverse flex-lg-row align-items-center">
                            <button
                                className="navbar-toggler ml-md-2 "
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="converters-dropdown  d-none d-lg-flex">
                                <ul className="navbar-nav ml-auto">
                                    <div className="dropdown">
                                        <button
                                            className="nav-btn btn m-2  dropdown-toggle"
                                            type="button"
                                            id="dropdownMenu2"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            style={{
                                                outline: "none",
                                                boxShadow: "none",
                                            }}
                                        >
                                            Converters
                                        </button>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenu2"
                                        >
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link className="link" to="/">
                                                    {" "}
                                                    Word to Pdf
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/excel-to-pdf"
                                                >
                                                    {" "}
                                                    Excel to PDF{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/ppt-to-pdf"
                                                >
                                                    {" "}
                                                    Ppt to Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/pdf-to-word"
                                                >
                                                    Pdf to Word{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/jpg-to-png"
                                                >
                                                    {" "}
                                                    Jpg to Png{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/png-to-jpg"
                                                >
                                                    {" "}
                                                    Png to Jpg{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/pdf-to-jpg"
                                                >
                                                    {" "}
                                                    Pdf to Jpg{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/pdf-to-png"
                                                >
                                                    {" "}
                                                    Pdf to Png{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/jpg-to-pdf"
                                                >
                                                    {" "}
                                                    Jpg to Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/png-to-pdf"
                                                >
                                                    Png to Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/merge-to-pdf"
                                                >
                                                    {" "}
                                                    Merge Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/rotate-pdf"
                                                >
                                                    {" "}
                                                    Rotate Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/split-pdf"
                                                >
                                                    {" "}
                                                    Split Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/protect-pdf"
                                                >
                                                    {" "}
                                                    Protect Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/print-to-pdf"
                                                >
                                                    {" "}
                                                    Print to Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/extract-pdf"
                                                >
                                                    {" "}
                                                    Extract Pdf{" "}
                                                </Link>
                                            </button>
                                        </div>
                                    </div>

                                    <li className="nav-item">
                                        <a
                                            className="nav-link text-dark rounded nav-btn1"
                                            href="/faq/"
                                        >
                                            Help
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12  d-block d-lg-none overflow-auto">
                            <div
                                className="collapse navbar-collapse"
                                id="navbarSupportedContent"
                            >
                                <ul
                                    className=" navbar-nav ml-auto "
                                    id="expanded-nav"
                                >
                                    <div class="dropdown dropdown-nav">
                                        <button
                                            className="btn   dropdown-toggle"
                                            type="button"
                                            id="dropdownMenu2"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            style={{
                                                outline: "none",
                                                boxShadow: "none",
                                            }}
                                        >
                                            Converters
                                        </button>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenu2"
                                        >
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link className="link" to="/">
                                                    {" "}
                                                    Word to Pdf
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/excel-to-pdf"
                                                >
                                                    {" "}
                                                    Excel to PDF{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/ppt-to-pdf"
                                                >
                                                    {" "}
                                                    Ppt to Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/pdf-to-word"
                                                >
                                                    Pdf to Word{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/jpg-to-png"
                                                >
                                                    {" "}
                                                    Jpg to Png{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/png-to-jpg"
                                                >
                                                    {" "}
                                                    Png to Jpg{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/pdf-to-jpg"
                                                >
                                                    {" "}
                                                    Pdf to Jpg{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/pdf-to-png"
                                                >
                                                    {" "}
                                                    Pdf to Png{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/jpg-to-pdf"
                                                >
                                                    {" "}
                                                    Jpg to Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/png-to-pdf"
                                                >
                                                    Png to Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/merge-to-pdf"
                                                >
                                                    {" "}
                                                    Merge Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/rotate-pdf"
                                                >
                                                    {" "}
                                                    Rotate Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/split-pdf"
                                                >
                                                    {" "}
                                                    Split Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/protect-pdf"
                                                >
                                                    {" "}
                                                    Protect Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/print-to-pdf"
                                                >
                                                    {" "}
                                                    Print to Pdf{" "}
                                                </Link>
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                id="drop-list"
                                                type="button"
                                            >
                                                <Link
                                                    className="link"
                                                    to="/extract-pdf"
                                                >
                                                    {" "}
                                                    Extract Pdf{" "}
                                                </Link>
                                            </button>
                                        </div>
                                    </div>

                                    <li className="nav-item">
                                        <a
                                            className="nav-link text-grey-3 rounded px-3 py-3"
                                            href="/faq/"
                                        >
                                            Help
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;
