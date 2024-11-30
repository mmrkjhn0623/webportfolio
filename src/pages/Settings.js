import { onPageLoad, ContentHeader, cloudstorage } from "./CustomFunction.js";
import React, { useEffect } from "react";
import { useState } from "react";

const themetoggle = 0;
const Settings = () => {
  //const [themecolor, setThemeColor] = useState(localStorage.getItem("themecolor"));

  const ContainerColor = (theme) => {
    if (theme === "df") {
      localStorage.setItem("theme", "df-theme");
      document.body.classList = [];
      document.body.classList.add("df-theme");
    } else if (theme === "sk") {
      localStorage.setItem("theme", "sk-theme");
      document.body.classList = [];
      document.body.classList.add("sk-theme");
    } else if (theme === "yellow") {
      localStorage.setItem("themecolor", "54,54,33");
    } else if (theme === "blue") {
      localStorage.setItem("themecolor", "30,29,71");
    } else if (theme === "brown") {
      localStorage.setItem("themecolor", "38,26,12");
    } else {
      document.body.classList = [];
      localStorage.setItem("theme", "dm-theme");
    }
    /*document.getElementById('overlay').style.backgroundColor = "rgba("+localStorage.getItem("themecolor")+",0.60)";
        document.getElementById('sideNav').style.backgroundColor = "rgba("+localStorage.getItem("themecolor")+",0.90)";
        
        const containercolor = document.getElementsByClassName('container');
        for(var i=0;i<=containercolor.length;i++){
            containercolor[i].style.backgroundColor = "rgba("+localStorage.getItem('themecolor')+",0.60)";
        }*/
  };
  const BgImage = (image) => {
    //document.getElementById('root').style.backgroundImage = 'url(../bg-image/'+image+')';
    //localStorage.setItem("bgimage",image);
  };

  useEffect(() => {
    onPageLoad();
    ContentHeader("Settings", "settings");
    // document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";
  });

  return (
    <>
      <div
        className="container" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/
      >
        <div className="cont-header">
          <span className="cont-label">
            <b>Themes</b>
          </span>
        </div>
        <div className="cont-grid4 settings">
          <div className="grid-content">
            <a onClick={(event) => ContainerColor("df")}>
              <img
                src={cloudstorage + "/themes/df-theme.png"}
                className="itemimg"
              />
              <h4 style={{ textAlign: "center" }}>Basic Theme</h4>
            </a>
          </div>
          <div className="grid-content">
            <a onClick={(event) => ContainerColor("dk")}>
              <img
                src={cloudstorage + "/themes/dk-theme.png"}
                className="itemimg"
              />
              <h4 style={{ textAlign: "center" }}>Dark Theme</h4>
            </a>
          </div>
          <div className="grid-content">
            <a onClick={(event) => ContainerColor("sk")}>
              <img
                src={cloudstorage + "/themes/sk-theme.png"}
                className="itemimg"
              />
              <h4 style={{ textAlign: "center" }}>Pink Theme</h4>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
