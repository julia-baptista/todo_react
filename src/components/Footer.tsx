import React from "react";

import styes from "./Footer.module.css"

const Footer = () => {

  return (
    <footer className={styes.footer}>
      <p>
        <span>React + TS Todo</span> @ 2021
      </p>
    </footer>
  );
};

export default Footer;
