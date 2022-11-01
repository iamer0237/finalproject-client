import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ReportForm from "./components/ReportForm";
import Ticker from "./components/Ticker";
import logo from "./ibc21.png";
import "./App.css";
import NewMap from "./components/NewMap";
const App = () => {
  const [isShown, setIsShown] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [reports, setReports] = useState("");
  const ShowReportForm = (event) => {
    setIsShown((current) => !current);
  };
  const ShowPhotoForm = (event) => {
    setIsShown((current) => !current);
  };

  return (
    <div className="App">
      <div className="App-logo">
        <img src={logo} alt="ibc" />
      </div>
      <div>
        <Header />
      </div>
      <div className="AppTicker">
        <Ticker />
      </div>
    {/* <div>
        <button className="btn btn-primary" onClick={ShowReportForm}>
          Share Your Concern
        </button>
      <div> {isShown && <div className="report-form"><ReportForm /></div>}</div> </div>
       */}
     <div className="report-form">
        <ReportForm /> 
      </div>

      <div className="leaflet-container">
        <NewMap setReports={setReports} />
      </div>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        style={{
          position: "absulute",
          width: "auto",
          hight: "auto",
          padding: "1rem 2rem",
          border: "none",
          fontSize: "20px",
          bottom: "40px",
          right: "40px",
          backgroundColor: "blue",
          color: "#fff",
          textAlign: "center",
        }}
      >
        Go to top
      </button>
    </div>
  );
};
export default App;
