import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

import Map from "./Map";
function GetLocation(handleLocation) {
  const [address, setAddress] = useState();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const coordinates = [lat, lng];
  const [report, setReport] = useState([]);
      useEffect(() => {
        axios
          .get("http://localhost:4000/api/reports")
          .then((response) => {
            console.log(response.data);
            setReport(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
  return (
    <div className="App">
      <Map coordinates={coordinates} />
    
    </div>
  );
}

export default GetLocation;
