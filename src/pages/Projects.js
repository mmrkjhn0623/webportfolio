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

const Projects = () => {
  const themecolor = localStorage.getItem("themecolor");
  const navigate = useNavigate();
  const [projs, setProjs] = useState([]);

  useEffect(() => {
    ContentHeader("Projects", "projects");
    //document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";
    document.getElementById("loadercont").style.display = "block";
    document.getElementById("content").style.display = "none";
    loadProj();
  }, []);
  const loadProj = () => {
    Axios.get("getprojs").then((response) => {
      const obj = response.data;
      if (!Object.keys(response.data).length) {
        navigate("/");
      } else {
        setProjs(response.data);
        document.getElementById("loadercont").style.display = "none";
        document.getElementById("content").style.display = "block";
        CloseSidenav();
      }
    });
  };

  const redirectProjInfo = (projid, e) => {
    e.preventDefault();
    navigate("/projectinfo/" + projid);
  };

  const ConfirmDeletion = (projid, projname) => {
    document.getElementById("loadercont").style.display = "none";
    document.getElementById("content").style.display = "block";

    document.getElementById("projecttodelete").innerHTML = projname;
    document.getElementById("idprojtodelete").value = projid;
    document.getElementById("deletion-overlay").classList.add("active");
  };

  const CategorizedProjs = projs.reduce((acc, proj) => {
    if (!acc[proj.categ]) {
      acc[proj.categ] = [];
    }
    acc[proj.categ].push(proj);
    return acc;
  }, {});

  const toggleAdminAction = (id) => {
    var popups = document.querySelectorAll(".adminaction");
    popups.forEach((popup) => {
      var toggleBtn = document.querySelector(`[data-popup-id="${id}"]`);
      if (popup.id !== "projtoggle_" + id) {
        popup.style.display = "none";
        popup.setAttribute("aria-hidden", "true");
        toggleBtn.setAttribute("aria-expanded", "false");
      } else {
        if (popup.getAttribute("aria-hidden") === "true") {
          popup.style.display = "block";
          popup.setAttribute("aria-hidden", "false");
          toggleBtn.setAttribute("aria-expanded", "true");
        } else {
          popup.style.display = "none";
          popup.setAttribute("aria-hidden", "true");
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      }
    });

    /* var popup = document.getElementById("projtoggle_" + id);
        var toggleBtn = document.querySelector(`[data-popup-id="${id}"]`);

            if(popup.getAttribute("aria-hidden") === "true"){
                popup.style.display = "block";
                popup.setAttribute("aria-hidden", "false");
                toggleBtn.setAttribute("aria-expanded", "true");
            }
            else{
                popup.style.display = "none";
                popup.setAttribute("aria-hidden", "true");
                toggleBtn.setAttribute("aria-expanded", "false");
            } */
  };

  const setEditForm = (id, projname, url, categ, devperiod) => {
    document.getElementById("loadercont").style.display = "none";
    document.getElementById("content").style.display = "block";

    document.getElementById("formaction").value = "edit";
    document.getElementById("foreditid").value = id;

    document.getElementById("formheading").innerHTML = "Edit Project";
    document.getElementById("projsubmit").value = "Update";

    document.getElementById("selecteduploadimg").src = document.querySelector(
      "#proj_" + id + " .itemimg"
    ).src;
    document.getElementById("inputprojname").value = projname;
    document.getElementById("inputprojurl").value = url;
    document.getElementById("inputprojcateg").value = categ;
    document.getElementById("inputprojmonth").value = devperiod.substring(0, 3);
    document.getElementById("inputprojyear").value = devperiod.substring(4);
    document.getElementById("inputprojimage").value = "";
    document.getElementById("formaction").value = "edit";

    document.getElementById("addnew").classList.add("active");
  };

  document.addEventListener("click", (event) => {
    var isClickInsidePopupButton =
      event.target.classList.contains("admintoggle");
    if (!isClickInsidePopupButton) {
      // Close all popups
      var popups = document.querySelectorAll(".adminaction");
      popups.forEach((popup) => {
        popup.style.display = "none";
        popup.setAttribute("aria-hidden", "true");
        var popupId = popup.id;
        var toggleBtn = document.querySelector(
          `[data-popup-id="${popupId.substring(11)}"]`
        );
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    }
  });

  return (
    <div id="projects">
      {Object.entries(CategorizedProjs).map(([categ, ProjInCateg]) => (
        <div
          class="container"
          key={categ} /*style={{backgroundColor:'rgba('+themecolor+',0.60)'}}*/
        >
          <div class="cont-header">
            <span class="cont-label">
              <b>{categ}</b>
            </span>
          </div>
          <div class="cont-grid4">
            {ProjInCateg.map((val) => {
              return (
                <div class="grid-content" key={val._id} id={"proj_" + val._id}>
                  <a href={val.url} target="_blank">
                    <img
                      src={cloudstorage + "/data/projects/" + val.mainphoto}
                      className="itemimg"
                    />
                    <h4 style={{ margin: "20px 0px 5px 0px" }}>
                      {val.projname}
                    </h4>
                    <p style={{ margin: "0px 0px 20px 0px" }}>
                      {val.categ + " - " + val.devperiod}
                    </p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
