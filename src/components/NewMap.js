import "./styles.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./BlueIcon";
import ReportsOnMap from "./ReportsOnMap";
import axios from "axios";
const NewMap = ({ setReports }) => {
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
    const map = useMap();
    useEffect(() => {
      map.locate({ setView: true, maxZoom: 13 }).on("locationfound", (e)=> {
         setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        // Marker.setLatLng([e.latlng]).update();
        // const radius = e.accuracy/10;
        // const circle = L.circle(e.latlng, radius);
        // circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);
    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          You are Here <br />
          <b>LNG</b>: {bbox[0]} <br />
          <b>LAT</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }
  return (
    <>
      <MapContainer
        center={[48.35435, 11.788517]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100vh" }}
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
