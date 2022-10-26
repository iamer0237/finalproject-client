import { createReport } from "../utils/CreateReport";
import SelectCat from "./SelectCat";
import CupturePhoto from "./CupturePhoto";
import "./styles.css";
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "./LocationMarker";
import ReportOnMap from "./ReportsOnMap";
import UploadImage from "./UploadImage";
import NewMap from "./NewMap";
import { useGeolocated } from "react-geolocated";

const ReportForm = () => {
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({});
  const [coordinates, setCoordinates] = useState(null);
  const [image, setImage] = useState("");
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
          geolocationProvider: navigator.geolocation,
    isOptimisticGeolocationEnabled: true,
      },
      userDecisionTimeout: 5000,
  });
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
  };
  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

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
  return (
    <>
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
          <div>Name**:</div>
          <div>
            <input
              value={inputs.name}
              type="text"
              name="name"
              onChange={handleChange}
            />
          </div>
        </label>
        <br />
        <label>
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
        </label>
        <br />
        <label>
          <div>Category**:</div>
          <div>
            <SelectCat value={inputs.cat} handleChange={handleSelect} />
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
        <button>Submit Report</button>
        <p>Fields marked with ** are required, others optional</p>
      </form>
    </>
  );
};

export default ReportForm;
