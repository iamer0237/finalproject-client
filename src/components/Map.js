import "./styles.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "./BlueIcon";

const Map = () => {
  function LocationMarker(handleLocation) {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    console.log("position", position)

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
    <MapContainer
      center={[48.1951, 11.6068]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "70vh"}}
      
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker handle/>
    </MapContainer>

  );
};
export default Map;
