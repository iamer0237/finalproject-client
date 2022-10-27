import "./styles.css";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Select from "react-select";
import ReportForm from "./ReportForm";

import icon from "./BlueIcon";
import { height } from "@mui/system";

import ReportsOnMap from "./ReportsOnMap";
import axios from "axios";

const NewMap = ({ setReports }) => {
  const [selectValue, setSelectValue] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const [allReports, setAllReports] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/api/reports`)
      .then((response) => {
        console.log(response.data);
        setAllReports(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function LocationMarker() {
    const [position, setPosition] = useState(null);

    console.log(position);
    const [bbox, setBbox] = useState([]);
    const [selectValue, setSelectValue] = useState("");

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        map.locate({setView: true, maxZoom:20});
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);
    
    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          Your Location <br />
          <b>LNG</b>: {bbox[0]} <br />
          <b>LAT</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }

  return (
    <>
      <MapContainer
        center={[48.1951, 11.6068]}
        zoom={20}
        scrollWheelZoom
        style={{ height: "70vh" }}
        
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setReports={setReports} />

        {allReports.length &&
          allReports.map((report) => (
            <ReportsOnMap oneReport={report} key={report._id} />
          ))}
      </MapContainer>
    </>
  );
};
export default NewMap;
