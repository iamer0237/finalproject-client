import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import "../App.css"

export default function Header() {
  const displayMessage = () => {
    return <AppBar className="Text">Make Our Community Great</AppBar>;
  };
  
  return (
    <header>
      <div className="Text">{displayMessage()}</div>
    </header>
  );
}
