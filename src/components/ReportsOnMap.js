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
          <div>
            <img style={{ width: "80px" }} src={oneReport.image} alt="image" />
            {/* {oneReport.image} */}
            <h2>Issue: {oneReport.title}</h2>
            <h4>Category: {oneReport.category}</h4>
            <p>Description: {oneReport.description}</p>
            <p>Created by:{oneReport.name}</p>
            <p>Created on:{oneReport.createdAt}</p>
            <p>Status:{oneReport.status}</p>
          </div>
        </Popup>
      </Marker>
    </>
  ) : null;
}

export default ReportsOnMap;
