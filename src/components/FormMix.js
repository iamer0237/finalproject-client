

import { useState } from "react";
import { createReport } from "../utils/CreateReport";
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
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <legend>
          <h1>Report an Issue</h1>
        </legend>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label> <br />
       
        <label>
          Phone:(Optional)
          <input
            className="input"
            type="number"
            name="phone"
            onChange={handleChange}
          />
        </label>{" "}
        <br />
        <label>
          email:(optional)
          <input
            className="input"
            type="text"
            name="email"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            className="input"
            type="text"
            name="Category"
            onChange={handleChange}
          />
        </label>
    
        <label>
          Title:
          <input className="input" name="title" onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea
            className="textarea"
            name="description"
            onChange={handleChange}
          ></textarea>
        </label>
        <button>Submit</button>
      </form>
    </>
  );
};
export default Form;
