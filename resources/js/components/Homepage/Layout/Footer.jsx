import React, { useState } from "react";
import "../Styles/Footer.css";
import Swal from "sweetalert2";
import instance from "../../api/instance";

const Footer = () => {
    const [newsEmail, setNewsEmail] = useState("");

    const handleInputChange = (event) => {
        setNewsEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formData = new FormData();
        formData.append("email", newsEmail);

        try {
            const response = await instance.post("/api/newsLetter", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = response.data;

            if (data === "success") {
                Swal.fire(
                    "Success",
                    "News Letter Subscribed Successfully.",
                    "success"
                );

                setNewsEmail("");
            } else if (data === "duplicate") {
                Swal.fire(
                    "Warning",
                    "The email has already been taken.",
                    "warning"
                );
            }
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <footer className="text-white pt-5  pb-4 mt-auto Footer-upload mb-0">
                    <div className="container">
                        <div className="row flex-column-reverse flex-lg-row">
                            <div className="col-12 col-lg-8">
                                <div className="row">
                                    <div className="col-6 col-sm-3">
                                        <h5 className="font-weight-bold h6 text-uppercase mb-1">
                                            Info
                                        </h5>
                                        <ul className="list-unstyled ">
                                            <li className="pt-0">Formats</li>
                                            <li className="pt-0">
                                                Compression
                                            </li>
                                            <li className="pt-0">Pricing</li>
                                            <li className="pt-0">FAQ</li>
                                            <li className="pt-0">Status</li>
                                        </ul>
                                    </div>
                                    <div className="col-6 col-sm-3">
                                        <h5 className="font-weight-bold h6 text-uppercase mb-1">
                                            Popular
                                        </h5>
                                        <ul className="list-unstyled">
                                            <li className="pt-0">SPLIT PDF</li>
                                            <li className="pt-0">MERGE PDF</li>
                                            <li className="pt-0">
                                                PROTECT PDF
                                            </li>
                                            <li className="pt-0">
                                                DOCX to PDF
                                            </li>
                                            <li className="pt-0">SPLIT PDF</li>
                                        </ul>
                                    </div>
                                    <div className="col-6 col-sm-3">
                                        <h5 className="font-weight-bold h6 text-uppercase mb-1">
                                            Resources
                                        </h5>
                                        <ul className="list-unstyled">
                                            <li className="pt-0">
                                                Developer API
                                            </li>
                                            <li className="pt-0">Tools</li>
                                            <li className="pt-0">Blog</li>
                                        </ul>
                                    </div>
                                    <div className="col-6 col-sm-3">
                                        <h5 className="font-weight-bold h6 text-uppercase mb-1">
                                            Company
                                        </h5>
                                        <ul className="list-unstyled">
                                            <li className="pt-0">About Us</li>
                                            <li className="pt-0">
                                                Sustainability
                                            </li>
                                            <li className="pt-0">
                                                Terms of Service
                                            </li>
                                            <li className="pt-0">Privacy</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 mb-8 m-lg-0">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="emailNewsletter">
                                            Subscribe to <br /> our email
                                            newsletter
                                        </h3>
                                        <form
                                            className="form-inline mb-3"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="form-group mb-0">
                                                <div className="inputscbr">
                                                    <input
                                                        id="footer-subscribe-email"
                                                        className="inputEmail"
                                                        name="EMAIL"
                                                        placeholder="email"
                                                        type="email"
                                                        value={newsEmail}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="subscribeBtn  "
                                                    >
                                                        SUBSCRIBE
                                                    </button>{" "}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <small className="text-light ">
                                    Copyright © 2023 EasyConvertKIT - All Rights
                                    Reserved
                                </small>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Footer;
