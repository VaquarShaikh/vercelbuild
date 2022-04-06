import React from "react";
import "./aboutSection.css";
// import { Button, Typography, Avatar } from "@material-ui/core";
import { Button , Typography , Avatar } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
const About = () => {
  const visitInstagram = () => {
    window.location = "https://github.com/VaquarShaikh";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dil4vmd3n/image/upload/v1648642554/vlogo_sk18t5.jpg"
              alt="Founder"
            />
            <Typography>Vaquar Shaikh</Typography>
            <a href="https://github.com/VaquarShaikh" target="blank">
              <GitHubIcon className="instagramSvgIcon" />
            </a>
            <span>
              An aspiring software developer :)
              Mostly self taught , sometimes youtube . In case of emergency I use stackoverflow xD .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
