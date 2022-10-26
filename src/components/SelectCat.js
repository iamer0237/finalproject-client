import * as React from "react";
import { useState } from "react";
import Select from "react-select";
import "../App.css";

const options = [
  { value: "Street lighting", label: "Street lighting" },
  { value: "Traffic lights", label: "Traffic lights" },
  { value: "Street cleaning", label: "Street cleaning" },
  { value: "Rubbish", label: "Rubbish " },
  { value: "Potholes", label: "Potholes" },
  { value: "Pavements/footpaths", label: "Pavements/footpaths" },
  { value: "Graffiti", label: "Graffiti" },
  { value: "Bus stops", label: "Bus stops" },
  { value: "Trees", label: "Trees" },
  { value: "Other", label: "Other" },
];

function SelectCat({ handleChange }) {
  const [selectValue, setSelectValue] = useState("");
  const selectRef = React.useRef();

  const onClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
    <>
      <Select
        className="category"
        openMenuOnFocus={true}
        ref={selectRef}
        options={options}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
}
export default SelectCat;
