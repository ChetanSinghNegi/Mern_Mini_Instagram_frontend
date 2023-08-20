import React from "react";
import "./MainHeader.css";
import bgImg from "../../bgCrop.jpg";

const MainHeader = (props) => {
  return (
    <>
      <img src={bgImg} alt="background-image" className="img"></img>
      <header className="main-header">{props.children}</header>
    </>
  );
};

export default MainHeader;
