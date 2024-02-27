import ReactDOM from 'react-dom';
import { Outlet, Link, useParams, useSearchParams, useNavigate  } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {ContentHeader} from "./CustomFunction.js";
import Modal from 'react-modal';
import Axios from "axios";

Modal.setAppElement('#root');

const Projectinfo = () => {
    const {projid} = useParams();
    const navigate = useNavigate();
    const themecolor = localStorage.getItem("themecolor");
    const [imginmodal, setimginModal] = useState("");
    const [proj, setProj] = useState([]);
    const [projname, setProjName] = useState("");

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      //setimginModal(img);
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    function showimginModal(img, projname, e){
      e.preventDefault();
      setimginModal(img);
      setProjName(projname);
      openModal();
    }

    useEffect(() => {
          ContentHeader("Project Info");
          loadProjInfo();
    },[]);

    const loadProjInfo = () => {
      document.getElementById('loadercont').style.display = "block";
      document.getElementById('content').style.display = "none";
      Axios.post("getprojinfo",{'projid':projid}).then((response) => {
          const obj = response.data;
          if (!Object.keys(response.data).length) {
              navigate("/blogs");
          }
          else{
            document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.90)";
              setProj(response.data);
              showContent();
          }
      });
  };

  const showContent = () => {
      document.getElementById('loadercont').style.display = "none";
      document.getElementById('content').style.display = "block";
  }

    

    
    
    return(<div id="projinfo" style={{paddingBottom:"60px"}}>

      {proj.map((proj, index) => {
        return (
          <div key={index}>
            <h2>{proj.projname}</h2>
            <p className="projdetail">{proj.categ + " - " + proj.devperiod}</p>
            <p className="projcaption" dangerouslySetInnerHTML={ {__html: proj.caption} } />
            <div className="container" style={{backgroundColor: "rgba("+themecolor+",0.60)"}}>
              <div className="cont-header">
                <span className="cont-label"><b>Project Gallery</b></span>
              </div>
              <div className="cont-grid3">
              {proj.photos.map((photo, index) => {
                  return (
                    <div key={index}>
                    <div>
                      <img src={"../data/projects/"+proj.projname+"/"+photo} className="itemimg" onClick={e => showimginModal(photo, proj.projname, e)} />
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      })}


    <Modal className="modal" style={{backgroundColor: "rgba("+themecolor+",0.60)"}}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal} 
        contentLabel="Example Modal"
      >
        <img src={"../data/projects/"+projname+"/"+imginmodal} className="imginmodal" />
        <a className="closemodal" onClick={closeModal}>x</a>
    </Modal>

    </div>);

  }

export default Projectinfo;