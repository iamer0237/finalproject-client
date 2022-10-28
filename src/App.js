import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AllReports from "./components/AllReports";
import GetLocation from "./components/GetLocation";
import ReportForm from "./components/ReportForm";
import MapTestMap from "./components/ReportsOnMap";
import CupturePhoto from "./components/CupturePhoto";
import Ticker from "./components/Ticker";
import TakePhoto from "./components/TakePhoto";
import CloudApp from "./components/CloudApp";
import ShowReports from "./components/ShowReports";
import UploadImage from "./components/UploadImage";
import logo from "./logo.svg";
import "./App.css";
import Img from "./components/Img";
import NewMap from "./components/NewMap";
import Map from "./components/Map";
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
      <br />
      {/* <div>
        <button className="btn btn-primary" onClick={ShowReportForm}>
          Share Your Concern
        </button>
      </div>
      <div className="report-form"> {isShown && <ReportForm />}</div> */}
      
      <div className="report-form"><ReportForm /></div>
      <div className="leaflet-container">
        <NewMap setReports={setReports} />
      </div>
    </div>
  );
};
export default App;
