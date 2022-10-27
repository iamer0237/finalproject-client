import "./styles.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./BlueIcon";
import greenicon from "./GreenIcon";

import axios from "axios";
import { useState, useEffect } from "react";
import { height, width } from "@mui/system";
import "../App.css";

function ReportsOnMap({ oneReport }) {
  const [reports, setReports] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [allReports, setAllReports] = useState("");
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState();

  const map = useMap();
  return oneReport.coordinates.length ? (
    <>
      (
      <Marker position={oneReport.coordinates} icon={greenicon}>
        <Popup>
          <div >
            <div>
              <img
                style={{ width: "220px" }}
                src={oneReport.image}
                alt="image"
              />
            </div >
            {/* {oneReport.image} */}
            <div className="onereport">
              <h2>Title: {oneReport.title}</h2>
              <h6>Category: {oneReport.category}</h6>
              <p>Description: {oneReport.description}</p>
              <p>Reported by: {oneReport.name}</p>
              <p>Created on: {oneReport.createdAt}</p>
              {/* <p>Status:{oneReport.status}</p> */}
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  ) : null;
}

export default ReportsOnMap;
