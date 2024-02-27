import React, {Component} from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import {onPageLoad, ContentHeader, cloudstorage, CloseSidenav} from "./CustomFunction.js";
import Modal from 'react-modal';
import Axios from 'axios';

var project = "gang gang";

const SelectProj = (projectname) => {
  project = projectname;
}

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [tools, setTools] = useState([]);
  const [latestblog, setLatestBlog] = useState([]);
  const navigate = useNavigate();

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
   // document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";
    document.getElementById('loadercont').style.display = "block";
    document.getElementById('content').style.display = "none";  
    ContentHeader("Hello! I'm Mark John, And This is my Portfolio Site","home"); 
   // document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";
    loadProjectsforHome();
  },[]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const loadProjectsforHome = () => {
    Axios.get("getprojforhome").then((response) => {
        /*document.getElementById('loadercont').style.display = "none";
        document.getElementById('content').style.display = "block";*/
        const obj = response.data;
        if (!Object.keys(response.data).length) {
            navigate("/");
        }
        else {
          setProjects(response.data);
          loadToolsforHome();
        }
    });
  }
  const loadToolsforHome = () => {
    Axios.get("gettoolsforhome").then((response) => {
        /*document.getElementById('loadercont').style.display = "none";
        document.getElementById('content').style.display = "block";*/
        const obj = response.data;
        if (!Object.keys(response.data).length) {
            navigate("/");
        }
        else {
          setTools(response.data);
          loadLatestBlog();
          document.getElementById('loadercont').style.display = "none";
          document.getElementById('content').style.display = "block";
          CloseSidenav();
        }
    });
  }

  const loadLatestBlog = () => {
    Axios.get("getlatestblog").then((response) => {
        /*document.getElementById('loadercont').style.display = "none";
        document.getElementById('content').style.display = "block";*/
        const obj = response.data;
        if (!Object.keys(response.data).length) {
            navigate("/");
        }
        else {
          setLatestBlog(response.data);
        }
    });
  }

  const themecolor = localStorage.getItem("themecolor");

  

  return (<>
  <div className="container" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/>
    <div className="cont-header">
      <span className="cont-label"><b>Projects</b></span>
      <Link to="/projects" className="cont-upperright">See More</Link>
    </div>

    <div className="cont-grid4">
      {
        projects.map((val) => {
          return(
            <a class='grid-content' key={val._id} href={val.url} target="_blank">
                <img src={cloudstorage+'/data/projects/'+val.mainphoto} class='itemimg' />
                <h4 style={{margin:'20px 0px 5px 0px'}}>{val.projname}</h4>
                <p style={{margin:'0px 0px 20px 0px'}}>{val.categ + " - " + val.devperiod}</p>
            </a>
          );
        })
      }
    </div>
  </div>

            <div className="container" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/>
                <div className="cont-header">
                    <span className="cont-label"><b>Tools</b></span>
                    <Link to="/tools" className="cont-upperright">See More</Link>
                </div>

                <div className="cont-grid6">
                {
                  tools.map((val) => {
                    return(
                      <a href={val.url} target="_blank" className="grid-content">
                          <img src={cloudstorage+'/data/tools/'+val.img} class='itemimg' />
                          <h4>{val.toolname}</h4>
                      </a>
                    );
                  })
                }
                </div>
            </div>

            <div className="container">
            <div className="cont-header">
                    <span className="cont-label"><b>Latest Blog</b></span>
                    <Link to="/blogs" className="cont-upperright">See More</Link>
            </div>
                  {latestblog.map((val)=>{
                    return (
                   <div className="container article home">
                   <Link to={{ pathname: '/post/'+val.slug }}><img src={cloudstorage+"/data/featuredimg/"+val.featuredimg} class="featuredimg" /></Link>
                   <div className="cont-header">
                   <Link to={{ pathname: '/post/'+val.slug }} className="cont-label"><b>{val.title}</b></Link>
                   <p>{val.excerpt}</p>
                   </div>  
                   </div>
                    )
              })
            }
            </div>

            
    <div>
      
    </div>
  </>)

}

export const projname = project;

export default Home;