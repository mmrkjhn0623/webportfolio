// import styles from "../css/style.css";
import React, { Component } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CustomFunction,
  formatDate,
  ThemeSetup,
  Menutoggled,
  CloseSidenav,
} from "./CustomFunction.js";
import Modal from "react-modal";
import Axios from "axios";

window.onresize = CloseSidenav;

document.addEventListener("click", function (e) {
  /* let adminactiontoggles = document.querySelectorAll('.adminaction');
    adminactiontoggles.forEach((toggle) =>{

      if(toggle.classList.contains('toggled')){
        toggle.classList.remove('toggled');
      }

    }); */
});

const Layout = () => {
  var pagename = "";
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalMessage, setmodalMessage] = useState("");

  const navigate = useNavigate();

  // const [themecolor, setThemeColor] = useState("0,0,0");
  //const [bgimage, setBgImage] = useState('bg4.jpg');

  useEffect(() => {
    ThemeSetup();
    CloseSidenav();
    /*  setBgImage(localStorage.getItem("bgimage"));
        document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";

        if(localStorage.getItem("bgimage") !== null){
            document.getElementById('root').style.backgroundImage = 'url(../bg-image/'+bgimage+')';
        }
        else{
            document.getElementById('root').style.backgroundImage = 'url(../bg-image/bg4.jpg)';
        }
        if(localStorage.getItem("themecolor") !== null){
            setThemeColor(localStorage.getItem("themecolor"));
        }
        else{
            localStorage.setItem("themecolor","0,0,0");
            setThemeColor(localStorage.getItem("themecolor"));
        }*/
  });

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const Subscription = (e) => {
    e.preventDefault();
    document.getElementById("gosubscribe").value = "Submitting...";
    document.getElementById("gosubscribe").disabled = true;
    Axios.post("newsletter", {
      email: document.getElementById("email").value,
    }).then(() => {
      setTimeout(() => {
        document.getElementById("gosubscribe").value = "Subscribe";
        document.getElementById("email").value = "";
        document.getElementById("gosubscribe").disabled = false;
        setmodalMessage(
          "Thank you for your subscription, I'll reach out with you as soon as possible."
        );
        openModal();
      }, 2000);
    });
  };

  const displayProfile = () => {
    document.getElementById("loadercont").style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("profile").classList.add("active");
  };

  const displayAddNewForm = () => {
    document.getElementById("loadercont").style.display = "none";
    document.getElementById("content").style.display = "block";

    document.getElementById("formheading").innerHTML = "Add New Project";
    document.getElementById("projsubmit").value = "Post";

    clearProjectForm();

    document.getElementById("addnew").classList.add("active");
  };

  const closeProfile = () => {
    document.getElementById("profile").classList.remove("active");
  };

  const DisplaySelectedimg = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (event) {
        // Set the source of the image to the selected file
        document.getElementById("selecteduploadimg").src = event.target.result;
      };

      // Read the selected file as a data URL
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const projectSubmitted = (e) => {
    e.preventDefault();
    if (document.getElementById("formaction").value === "edit") {
      UpdateProject();
    } else {
      PostNewProject();
    }
  };

  const PostNewProject = (e) => {
    const fileInput = document.getElementById("inputprojimage");
    const file = fileInput.files[0];

    function generateRandomThreeLetterString() {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";

      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }

    if (file) {
      const projfilename = generateRandomThreeLetterString() + file.name;

      document.getElementById("projsubmit").value = "Posting...";
      document.getElementById("projsubmit").disabled = true;

      const formData = new FormData();
      formData.append("file", file, projfilename, { type: "image/png" });

      Axios.post("/uploadprojimg", formData)
        .then((response) => {
          console.log(response.data);

          Axios.post("postnewproject", {
            newprojname: document.getElementById("inputprojname").value,
            newprojurl: document.getElementById("inputprojurl").value,
            newprojcateg: document.getElementById("inputprojcateg").value,
            newdevperiod:
              document.getElementById("inputprojmonth").value +
              " " +
              document.getElementById("inputprojyear").value,
            newmainphoto: projfilename,
          }).then((response) => {
            setTimeout(() => {
              clearProjectForm();

              navigate("/");
              navigate("/projects");

              setmodalMessage("New project is successfully posted.");
              openModal();
            }, 2000);
          });

          // Handle success, if needed
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle error, if needed
        });
    } else {
      alert("Please select a file before submitting");
      // Handle the case where no file is selected
    }
  };

  const UpdateProject = () => {
    const fileInput = document.getElementById("inputprojimage");
    const file = fileInput.files[0];

    function generateRandomThreeLetterString() {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";

      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }
    document.getElementById("projsubmit").value = "Updating...";
    document.getElementById("projsubmit").disabled = true;

    if (file) {
      const projfilename = generateRandomThreeLetterString() + file.name;

      const formData = new FormData();
      formData.append("file", file, projfilename, { type: "image/png" });

      Axios.post("/uploadprojimg", formData)
        .then((response) => {
          console.log(response.data);

          Axios.post("updateprojectwithimg", {
            projid: document.getElementById("foreditid").value,
            projname: document.getElementById("inputprojname").value,
            projurl: document.getElementById("inputprojurl").value,
            projcateg: document.getElementById("inputprojcateg").value,
            devperiod:
              document.getElementById("inputprojmonth").value +
              " " +
              document.getElementById("inputprojyear").value,
            mainphoto: projfilename,
          }).then((response) => {
            setTimeout(() => {
              clearProjectForm();
              navigate("/");
              navigate("/projects");

              setmodalMessage("Project is updated sucessfully.");
              openModal();
            }, 2000);
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle error, if needed
        });
    } else {
      Axios.post("updateprojectwithoutimg", {
        projid: document.getElementById("foreditid").value,
        projname: document.getElementById("inputprojname").value,
        projurl: document.getElementById("inputprojurl").value,
        projcateg: document.getElementById("inputprojcateg").value,
        devperiod:
          document.getElementById("inputprojmonth").value +
          " " +
          document.getElementById("inputprojyear").value,
      }).then((response) => {
        setTimeout(() => {
          clearProjectForm();
          navigate("/");
          navigate("/projects");

          setmodalMessage("Project is updated sucessfully.");
          openModal();
        }, 2000);
      });
    }
  };

  const deleteProject = (e) => {
    e.preventDefault();
    document.getElementById("confirmdeletion").value = "...";
    document.getElementById("confirmdeletion").disabled = true;
    Axios.delete(
      `/deleteproj/${document.getElementById("idprojtodelete").value}`
    ).then((response) => {
      setTimeout(() => {
        navigate("/");
        navigate("/projects");

        document.getElementById("deletion-overlay").classList.remove("active");
        document.getElementById("confirmdeletion").value = "OK";
        document.getElementById("confirmdeletion").disabled = false;

        setmodalMessage("Project is successfully deleted.");
        openModal();
      }, 2000);
    });
  };

  const clearProjectForm = () => {
    document.getElementById("projsubmit").value = "Post";
    document.getElementById("projsubmit").disabled = false;

    document.getElementById("addnew").classList.remove("active");

    document.getElementById("inputprojname").value = "";
    document.getElementById("inputprojurl").value = "";
    document.getElementById("inputprojcateg").value = "";
    document.getElementById("inputprojmonth").value = "Month";
    document.getElementById("inputprojyear").value = "Year";
    document.getElementById("inputprojimage").value = "";
    document.getElementById("selecteduploadimg").src = "../img/uploadimg.png";
  };

  return (
    <div
      className="overlay"
      id="overlay" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/
    >
      <a class="icon menu-toggle" id="menu-toggle" onClick={Menutoggled}>
        <i class="fa fa-bars"></i>
      </a>
      <div
        className="sidenav"
        id="sideNav" /* style={{backgroundColor: "rgba("+themecolor+",0.90)"}} */
      >
        <div className="sidebar-content">
          <a
            href="#"
            onClick={(event) => displayProfile()}
            className="profile sidenav-profile"
          >
            <img src="/img/profilepic.png" className="profileimg" />
            <span className="profilename">Mark John</span>
          </a>
          <Link to="/webportfolio" className="sidenav-home">
            <img src="/img/home.png" className="menuicon" />
            <span className="menulabel">Home</span>
          </Link>
          <Link to="/projects" className="sidenav-projects">
            <img src="/img/projects.png" className="menuicon" />
            <span className="menulabel">Projects</span>
          </Link>
          <Link to="/tech" className="sidenav-tools">
            {" "}
            <img src="/img/tools.png" className="menuicon" />
            <span className="menulabel">Tech Skills</span>
          </Link>
          <Link to="/blogs" className="sidenav-blogs">
            <img src="/img/blogs.png" className="menuicon" />
            <span className="menulabel">Blogs</span>
          </Link>
          <Link to="/contact" className="sidenav-contact">
            <img src="/img/contact.png" className="menuicon" />
            <span className="menulabel">Contact</span>
          </Link>
          <Link to="/settings" className="sidenav-settings">
            <img src="/img/setting.png" className="menuicon" />
            <span className="menulabel">Settings</span>
          </Link>
        </div>
      </div>
      <div id="loadercont" className="content">
        <div class="loading-heading">
          <span
            className="loadingph"
            style={{ width: "200px", height: "19px", marginBlock: "16px" }}
          ></span>
          <span
            className="loadingph"
            style={{ width: "320px", height: "29px" }}
          ></span>
        </div>
        <div className="container">
          <div className="cont-header-loading">
            <span className="cont-label">
              <span
                className="loadingph"
                style={{ width: "74px", height: "24px" }}
              ></span>
            </span>
            <span className="cont-upperright">
              <span
                className="loadingph"
                style={{ width: "68px", height: "19px" }}
              ></span>
            </span>
          </div>
          <div className="cont-grid4">
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="cont-header-loading">
            <span className="cont-label">
              <span
                className="loadingph"
                style={{ width: "74px", height: "24px" }}
              ></span>
            </span>
            <span className="cont-upperright">
              <span
                className="loadingph"
                style={{ width: "68px", height: "19px" }}
              ></span>
            </span>
          </div>
          <div className="cont-grid6">
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
            <div class="grid-content">
              <span
                className="loadingph"
                style={{ width: "100%", aspectRatio: "245/184" }}
              ></span>
              <h4 style={{ margin: "20px 0px 5px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100%", height: "19px" }}
                ></span>
              </h4>
              <p style={{ margin: "0px 0px 20px 0px" }}>
                <span
                  className="loadingph"
                  style={{ width: "100", height: "19px" }}
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-overlay" id="profile">
        <div className="container profile-cont">
          <div className="profile-header">
            <button
              className="closeprofile"
              onClick={(event) => closeProfile()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img src="/img/profile-header.jpg" />
            <div className="dp-and-resume">
              <img src="/img/startup-loader.png" className="profile-img" />
              <a
                href="https://storage.googleapis.com/mark-john-portfolio.appspot.com/data/resume/MarkJohnCV.pdf"
                target="_blank"
              >
                Download Resume
              </a>
            </div>
          </div>
          <div class="profile-info">
            <h4 style={{ fontSize: "18px", fontWeight: "400" }}>
              I’m a Web Developer looking to continue my career to explore more
              ideas. I have excellent design & coding skills, as well as an
              ability to convert client requirements into an exciting online
              applications.
            </h4>
            <br />
            <div className="profile-info-cont">
              <div class="profile-about-grid">
                <h4 style={{ marginTop: "0px" }}>Basic Info</h4>
                <p>
                  <b>Phone: </b>
                  <br /> 09358245202
                </p>
                <p>
                  <b>Email: </b>
                  <br /> mmrkjhn@gmail.com
                </p>
                <p>
                  <b>Address: </b>
                  <br /> Cebu, Philippines
                </p>
                <p>
                  <b>Employment Status: </b>
                  <br /> Freelancing
                </p>
                <p>
                  <b>Available for: </b>
                  <br /> Full time
                </p>

                <h4 style={{ marginTop: "30px" }}>Other things I enjoy</h4>
                <p>Playing and listening to music</p>
                <p>Watching Anime</p>
                <p>Reading IT News and Trends</p>
                <p>Feeding cats</p>
                <p>Hiking</p>
              </div>
              <div className="career-and-skill">
                <h3>Career Info</h3>
                <h4>
                  RipeConcepts - Wordpress Developer (July 2022 - Sept 2024)
                </h4>
                <p>
                  RipeConcepts was founded by two award-winning entrepreneurs in
                  2008 with the sole aim of developing on-trend creative and
                  tailored solutions for every client. After initially offering
                  graphic design, we have since expanded our pool of talents and
                  expertise to web and app development, animation, digital
                  marketing, and employee leasing.
                </p>
                <ul>
                  <li className="company-address">
                    8/F Ayala Center Cebu Tower, Cebu City, Philippines 6000
                  </li>
                  <li className="company-contact">+63324951412</li>
                  <li className="company-site">
                    <a href="https://ripeconcepts.com/" target="_blank">
                      https://ripeconcepts.com/
                    </a>
                  </li>
                </ul>
                <h4>
                  Freelancing - Web/Wordpress Developer (Sept 2020 - June 2022)
                </h4>
                <p>
                  As a freelancer, I offer professional services in web
                  development, providing tailored solutions to clients seeking
                  to establish or enhance their online presence. With my
                  expertise in coding, design, and functionality, I create
                  visually appealing and user-friendly websites that align with
                  my client's needs and objectives.
                </p>
                <ul>
                  <li className="company-address">Work From Home</li>
                  <li className="company-contact">09358245202</li>
                  <li className="company-site">
                    <a href="mailto:mmrkjhn@gmail.com" target="_blank">
                      mmrkjhn@gmail.com
                    </a>
                  </li>
                </ul>
                <h3 style={{ marginTop: "40px" }}>Education</h3>
                <h4>Bachelor of Science in Information Technology (2013)</h4>
                <p>
                  Cebu Roosevelt Memorial Colleges <br /> San Vicente St., Bogo
                  City, Cebu, Philippines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content" id="content">
        <div className="content-heading">
          <p>{formatDate()}</p>
          <h2 id="content-heading"></h2>
        </div>
        <Outlet />

        <div
          className="container footer"
          style={{ backgroundColor: "transparent", color: "#868686" }}
        >
          <div className="footer-cont">
            <div>
              <div className="cont-label">
                <h4>Social Media</h4>
              </div>
              <ul class="footer-list social-media">
                <li>
                  <a href="https://www.facebook.com/mmrkjhn" target="_blank">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h3.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h3.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"
                        fill="#868686"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/mmrkjhn/" target="_blank">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673 c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671c0.043,0.949,0.052,1.234,0.052,3.637 s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035 c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31c-0.949,0.043-1.233,0.052-3.637,0.052 s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673 c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12 s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035 c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3 C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511 c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711 c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038 c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418 c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185 C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594 c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3L12,3z M12,7.378 c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15 c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08 s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z"
                        fill="#868686"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/mmrk_jhnn" target="_blank">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M22.23,5.924c-0.736,0.326-1.527,0.547-2.357,0.646c0.847-0.508,1.498-1.312,1.804-2.27 c-0.793,0.47-1.671,0.812-2.606,0.996C18.324,4.498,17.257,4,16.077,4c-2.266,0-4.103,1.837-4.103,4.103 c0,0.322,0.036,0.635,0.106,0.935C8.67,8.867,5.647,7.234,3.623,4.751C3.27,5.357,3.067,6.062,3.067,6.814 c0,1.424,0.724,2.679,1.825,3.415c-0.673-0.021-1.305-0.206-1.859-0.513c0,0.017,0,0.034,0,0.052c0,1.988,1.414,3.647,3.292,4.023 c-0.344,0.094-0.707,0.144-1.081,0.144c-0.264,0-0.521-0.026-0.772-0.074c0.522,1.63,2.038,2.816,3.833,2.85 c-1.404,1.1-3.174,1.756-5.096,1.756c-0.331,0-0.658-0.019-0.979-0.057c1.816,1.164,3.973,1.843,6.29,1.843 c7.547,0,11.675-6.252,11.675-11.675c0-0.178-0.004-0.355-0.012-0.531C20.985,7.47,21.68,6.747,22.23,5.924z"
                        fill="#868686"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/mark-john-mondares-b87888235/"
                    target="_blank"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
                        fill="#868686"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="cont-label">
                <h4>Contacts</h4>
              </div>
              <ul class="footer-list">
                <li>
                  <a href="mailto:mmrkjhn@gmail.com" target="_blank">
                    <svg
                      width="25"
                      height="20"
                      viewBox="0 0 25 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.1057 2.79061C24.1057 1.50728 23.0557 0.457275 21.7724 0.457275H3.10573C1.8224 0.457275 0.7724 1.50728 0.7724 2.79061V16.7906C0.7724 18.0739 1.8224 19.1239 3.10573 19.1239H21.7724C23.0557 19.1239 24.1057 18.0739 24.1057 16.7906V2.79061ZM21.7724 2.79061L12.4391 8.62394L3.10573 2.79061H21.7724ZM21.7724 16.7906H3.10573V5.12394L12.4391 10.9573L21.7724 5.12394V16.7906Z"
                        fill="#868686"
                      ></path>
                    </svg>
                    mmrkjhn@gmail.com
                  </a>
                </li>
                <li id="telno">
                  <a href="tel:09358245202" target="_blank">
                    <svg
                      class="phone-icon"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.625 7.29167C16.1775 7.29167 16.7074 7.51116 17.0981 7.90186C17.4888 8.29256 17.7083 8.82247 17.7083 9.375M15.625 3.125C17.2826 3.125 18.8723 3.78348 20.0444 4.95558C21.2165 6.12769 21.875 7.7174 21.875 9.375M5.20833 4.16667H9.375L11.4583 9.375L8.85417 10.9375C9.96975 13.1995 11.8005 15.0303 14.0625 16.1458L15.625 13.5417L20.8333 15.625V19.7917C20.8333 20.3442 20.6138 20.8741 20.2231 21.2648C19.8324 21.6555 19.3025 21.875 18.75 21.875C14.6867 21.6281 10.8543 19.9026 7.97586 17.0241C5.0974 14.1457 3.37193 10.3133 3.125 6.25C3.125 5.69747 3.34449 5.16756 3.73519 4.77686C4.12589 4.38616 4.6558 4.16667 5.20833 4.16667Z"
                        stroke="#868686"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    +639358245202
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="cont-label">
                <h4>Quick Link</h4>
              </div>
              <ul class="footer-list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/projects">Projects</Link>
                </li>
                <li>
                  <Link to="/tech">Tech Skills</Link>
                </li>
                <li>
                  <Link to="/blogs">Blogs</Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="cont-label">
                <h4>Join To My Newsletter</h4>
              </div>
              <p style={{ maxWidth: "450px" }}>
                Subscribe to my newsletter to receive emails about new projects
                and updates.
              </p>
              <form className="homeform" onSubmit={Subscription}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  required
                />
                <input type="submit" value="Subscribe" id="gosubscribe" />
              </form>
            </div>
          </div>
          <p style={{ textAlign: "center" }}>
            © 2024 Mark John Portfolio. All Rights Reserved.
          </p>
        </div>
      </div>

      <Modal
        className="modal" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>{modalMessage}</h2>
        <a href="#" className="closemodal" onClick={closeModal}>
          x
        </a>
      </Modal>
    </div>
  );
};
export default Layout;
