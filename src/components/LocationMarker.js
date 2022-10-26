import { createReport } from "../utils/CreateReport";
import SelectCat from "./SelectCat";
import CupturePhoto from "./CupturePhoto";
import ReportsOnMap from "./ReportsOnMap";
import Map from "./Map";
import "./styles.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Select from "react-select";
import icon from "./BlueIcon";
import { height } from "@mui/system";
import "./styles.css";

function LocationMarker({ setMapCoordinates }) {
  const [position, setPosition] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [bbox, setBbox] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      setCoordinates(e.latlng);
      setMapCoordinates(e.latlng);
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
export default LocationMarker;
