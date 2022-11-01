import { createReport } from "../utils/CreateReport";
import SelectCat from "./SelectCat";
import ReportsOnMap from "./ReportsOnMap";
import "./styles.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Select from "react-select";
import icon from "./BlueIcon";
import { height } from "@mui/system";
import axios from "axios";
import "./styles.css";
import "./styles.css";
import  { useRef,  } from "react";
import "leaflet/dist/leaflet.css";
import ReportOnMap from "./ReportsOnMap";
import UploadImage from "./UploadImage";
import NewMap from "./NewMap";
import Map from "./NewMap";

import { useGeolocated } from "react-geolocated";

function ReportTest({ setReports, setMapCoordinates }) {
  const [position, setPosition] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [bbox, setBbox] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [image, setImage] = useState("");
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
    const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({});
  const [coordinates, setCoordinates] = useState(null);
  const [image, setImage] = useState("");
  const ref = useRef();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
        geolocationProvider: navigator.geolocation,
        isOptimisticGeolocationEnabled: true,
      },
      userDecisionTimeout: 5000,
    });

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        map.locate({ setView: true, maxZoom: 13 });
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        // Marker.setLatLng([e.latlng]).update();
        // const radius = e.accuracy/10;
        // const circle = L.circle(e.latlng, radius);
        // circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);
    const handleSubmit = async (e) => {
        console.log(file);
        e.preventDefault();
        try {
          const data = inputs;
          data.coordinates = [coordinates.lat, coordinates.lng];
          data.image = image;
          const { error } = await createReport(data);
          if (error) throw error;
        } catch (err) {
          console.error(err);
        }
    
        
        setInputs({ name: "", title: "", category: "", description: "" });
        refreshPage()
      };
      const previewFiles = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage(reader.result);
        };
      };
      const refreshPage = ()=>{
        window.location.reload();
     }
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        previewFiles(file);
      };
      const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prevState) => ({ ...prevState, [name]: value }));
      };
      const handleSelect = (e) => {
        setInputs((prevState) => ({ ...prevState, category: e.value }));
      };
      console.log(inputs);
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
  <form className="form" onSubmit={handleSubmit}>
        <MapContainer
          center={[48.1951, 11.6068]}
          zoom={20}
          scrollWheelZoom
          style={{ height: "50vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker setMapCoordinates={setCoordinates} />
        </MapContainer>
        <label htmlFor="fileInput"></label>
        <input
          type="file"
          accept="image/*"
          capture
          id="fileInput"
          onChange={(e) => handleImageChange(e)}
          required
        />
        <br />
        <label>
          <div>Your Name**:</div>
          <div>
            <input
              value={inputs.name}
              type="text"
              name="name"
              onChange={handleChange}
            />
          </div>
        </label>

        {/* <label>
          <div>Phone:</div>
          <div>
            <input
              className="input"
              value={inputs.phone}
              type="number"
              name="phone"
              onChange={handleChange}
            />
          </div>
        </label>
        <br />
        <label>
          <div>email:</div>
          <input
            value={inputs.email}
            className="input"
            type="text"
            name="email"
            onChange={handleChange}
          />
        </label> */}
        <br />
        <label>
          <div>Category**:</div>
          <div>
            <SelectCat value={inputs.category} handleChange={handleSelect} />
          </div>
        </label>
        <br />
        <label>
          <div> Title**:</div>
          <div>
            <input
              value={inputs.title}
              className="input"
              name="title"
              onChange={handleChange}
            />
          </div>
          <br />
        </label>
        <label>
          <div> Description**:</div>
          <textarea
            value={inputs.description}
            className="textarea"
            name="description"
            onChange={handleChange}
          ></textarea>
        </label>
        <button className="btn btn-primary">Submit Your Concern</button>
        <p>Fields marked with ** are required, others optional</p>
      </form>
</>
)}}
export default ReportTest;
