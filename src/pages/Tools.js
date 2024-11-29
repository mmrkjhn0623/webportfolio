import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import {
  onPageLoad,
  ContentHeader,
  cloudstorage,
  CloseSidenav,
} from "./CustomFunction.js";
import Axios from "axios";
import ReactDOMServer from "react-dom/server";

const Tools = () => {
  //const themecolor = localStorage.getItem("themecolor");
  const navigate = useNavigate();
  const [tools, setTools] = useState([]);

  useEffect(() => {
    ContentHeader("Tech Skills", "tools");
    //document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";
    document.getElementById("loadercont").style.display = "block";
    document.getElementById("content").style.display = "none";
    loadTooluse();
  }, []);
  const loadTooluse = () => {
    Axios.get("gettools").then((response) => {
      const obj = response.data;
      if (!Object.keys(response.data).length) {
        navigate("/");
      } else {
        setTools(response.data);
        document.getElementById("loadercont").style.display = "none";
        document.getElementById("content").style.display = "block";
        CloseSidenav();
      }
    });
  };

  const CategorizedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.categ]) {
      acc[tool.categ] = [];
    }
    acc[tool.categ].push(tool);
    return acc;
  }, {});

  return (
    <div id="tools">
      {Object.entries(CategorizedTools).map(([categ, ToolInCateg]) => (
        <div
          class="container"
          key={categ} /*style={{backgroundColor:'rgba('+themecolor+',0.60)'}}*/
        >
          <div class="cont-header">
            <span class="cont-label">
              <b>{categ}</b>
            </span>
          </div>
          <div class="cont-grid6 tool-grid">
            {ToolInCateg.map((val) => {
              return (
                <div className="grid-content">
                  <a href={val.url} target="_blank">
                    <img
                      src={cloudstorage + "/data/tools/" + val.img}
                      class="itemimg"
                    />
                    <h4 className="toolname">{val.toolname}</h4>
                  </a>
                  <div className="toolinfo">
                    <h4 style={{ marginBlock: "0px" }}>{val.toolname}</h4>
                    <p>{val.caption}</p>
                    <a href={val.url} target="_blank">
                      {val.url}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tools;
