import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AllReports from "./components/AllReports";
import ReportForm from "./components/ReportFormorg";
import TestMap from "./components/MaptestMap";
import CupturePhoto from "./components/CupturePhoto";
import Ticker from "./components/Ticker";
import TakePhoto from "./components/TakePhoto";
import CloudApp from "./components/CloudApp";

import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [isShown, setIsShown] = useState(false);
  const ShowReportForm = (event) => {
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
      <div>
        <button className="report-form" onClick={ShowReportForm}>
          Report an Issue
        </button>
        <div className="report-form"> {isShown && <ReportForm />}</div>
      </div>
<div><CupturePhoto /></div> 
      <div>
        <CloudApp />
      </div>
  <div className="report-form">
        <ReportForm />
      </div> 
    <div className="reports">
        <AllReports />
       </div> 
      <br />
      <div>
        <TestMap />
      </div>
    </div>
  );
};
export default App;
