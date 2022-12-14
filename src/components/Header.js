import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import "../App.css";
export default function Header() {
  const displayMessage = () => {
    return (
      <AppBar style={{ background: "#005599" }} className="Text">
        Share your concerns with the community
      </AppBar>
    );
  };
  
  return (
    <header>
      <div className="Text">{displayMessage()}</div>
    </header>
  );
}
