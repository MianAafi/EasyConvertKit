import React from "react";
import "../Styles/Cards.css";

const Cards = () => {
  return (
    <>
      <div className="container">
        <h1
          className="text-center"
          style={{
            fontFamily: "Open Sans",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "54px",
            letterSpacing: "-0.04em",
            marginTop: "50px",
            color: "#7B61FF",
          }}
        >
          Why to Chose us
        </h1>
        <div
          className="row row-cols-1 row-cols-md-4 g-4"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <div className="col-sm-3">
            <div className="card h-100 ">
              <img
                src="/Images/Vector(8).png"
                style={{
                  marginLeft: "40%",
                  height: "50px",
                  width: "50px",
                  marginTop: "50px",
                  marginBottom: "50px",
                }}
                alt="..."
              />

              <div className="card-body">
                <h5 className="card-title">Ease Of Use</h5>
                <p className="card-text">
                  Convert a file without needing to download any software. It
                  will take just a few moments for you to get the file in the
                  format that you require.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card h-100">
              <img
                src="/Images/Vector(9).png"
                style={{
                  marginLeft: "40%",
                  height: "50px",
                  width: "50px",
                  marginTop: "50px",
                  marginBottom: "50px",
                }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Privacy</h5>
                <p className="card-text">
                  This card has supporting text below as a natural lead-in to
                  additional content.Security is our number one priority. Files
                  converted using our free service are permanently deleted with
                  in seven days. Our privacy policy can be read here.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card h-100">
              <img
                src="/Images/Vector(10).png"
                style={{
                  marginLeft: "40%",
                  height: "50px",
                  width: "50px",
                  marginTop: "50px",
                  marginBottom: "50px",
                }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quick</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card h-100">
              <img
                src="/Images/Vector(11).png"
                style={{
                  marginLeft: "40%",
                  height: "50px",
                  width: "50px",
                  marginTop: "50px",
                  marginBottom: "50px",
                }}
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title text-center">Any Operation system</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
