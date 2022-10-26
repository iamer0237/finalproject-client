import { useState } from "react";
import { createReport } from "../utils/CreateReport";
import SelectCat from "./SelectCat";
import CupturePhoto from "./CupturePhoto";
import MaptestMap from "./ReportsOnMap";
import "./styles.css";


const Form = () => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { report, error } = await createReport(inputs);
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  

    setInputs((prevState) => ({ ...prevState, [name]: value })); 
     console.log(value);
  };
  const handleSelect = (e) => {
    setInputs((prevState) => ({ ...prevState, category: e.value }));
  };
  const handleLocation = (e) => {
    setInputs((prevState) => ({ ...prevState, coordinates: e.value }));
  };

  console.log(inputs);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <legend>
          <h1>Report an Issue</h1>
        </legend>
        <label>
          Name**:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <label>
          Imag**:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <br />
        <label>
          <div>Phone:</div>
          <div>
            <input
              className="input"
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
            className="input"
            type="text"
            name="email"
            onChange={handleChange}
          />
        </label>
        <label>
          <div>Category**:</div>
          <SelectCat handleChange={handleSelect} />
        </label>
        <br />
        <label>
          <div className="map">
            Use Current Location:
            <input
              type="checkbox"
              name="coordinates"
              onChange={handleLocation}
            />
            <MaptestMap handleChange={handleLocation} />
          </div>
        </label>
        <CupturePhoto />
        <label>
          Title**:
          <input className="input" name="title" onChange={handleChange} />
        </label>
        <br />
        <label>
          Description**:
          <textarea
            className="textarea"
            name="description"
            onChange={handleChange}
          ></textarea>
        </label>
        <button>Submit Report</button>
        <p>Fiels marked with ** are required, others optional</p>
      </form>
    </>
  );
};
export default Form;
