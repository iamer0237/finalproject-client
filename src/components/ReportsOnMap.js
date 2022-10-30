import "./styles.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import greenicon from "./GreenIcon";

import { useState, useEffect } from "react";
import "../App.css";

function ReportsOnMap({ oneReport }) {
  

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
            <div className="onereport">
              <h2>Title: {oneReport.title}</h2>
              <h6>Category: {oneReport.category}</h6>
              <p>Description: {oneReport.description}</p>
              <p>Reported by: {oneReport.name}</p>
              <p>Created on: {oneReport.createdAt}</p>
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  ) : null;
}

export default ReportsOnMap;
