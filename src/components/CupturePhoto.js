import React, { useState } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import { IconButton } from "@mui/material";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px",
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none",
  },
}));
const CupturePhoto =() =>{
  const classes = useStyles();
  const [source, setSource] = useState("");
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <h5>Take a Photo</h5>
          {source && (
            <Box
              display="flex"
              justifyContent="center"
              border={1}
              className={classes.imgBox}
            >
              <img src={source} alt={"snap"} className={classes.img}></img>
              {console.log(source)}
            </Box>
          )}
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <LocalSeeIcon fontSize="large" color="primary" />
            </IconButton>
          </label>
        </Grid>
      </Grid>
    </div>
  );
}
export default CupturePhoto;
