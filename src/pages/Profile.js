import ReactDOM from 'react-dom';
import {onPageLoad, ContentHeader} from "./CustomFunction.js";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Axios from "axios";
import ReactDOMServer from "react-dom/server";
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Profile = () => {
    //const themecolor = localStorage.getItem("themecolor");
    const navigate = useNavigate();

    const [photoinmodal, setPhotoinmodal] = useState();

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
  
      function showimginModal(photo, e){
        e.preventDefault();
        setPhotoinmodal(photo);
        openModal();
      }

    useEffect(() => {
        ContentHeader("Hello I'm Mark John A Front-End Developer", "profile");
        //document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";
        onPageLoad();
    },[]);

    const showContent = () => {
        document.getElementById('loadercont').style.display = "none";
        document.getElementById('content').style.display = "block";
    }
    
    return (<div id="bloglist">
            <div className="container profile" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/>
            <img src="../img/320224027_858510095199047_1952014509904230253_n.jpg" class="featuredimg" />
            <div className="cont-header">
            <div className="cont-label"><b>About</b></div>
            <p>I’m a Web Developer looking to continue my career to explore more ideas.</p>
            <div class="profile-about-grid">
                <p><b>Birthday:  </b> June 23, 1991</p>
                <p><b>Age:  </b> 32</p>
                <p><b>Website:  </b> <a href="https://mark-john-portfolio.as.r.appspot.com/">https://mark-john-portfolio.as.r.appspot.com/</a></p>
                <p><b>Degree:  </b> BSIT</p>
                <p><b>Phone:  </b> 09358245202</p>
                <p><b>Email:  </b> mmrkjhn@gmail.com</p>
                <p><b>Address:  </b> Cebu, Philippines</p>
                <p><b>Freelance:  </b> Available</p>
            </div>
            </div>  
            </div>

            <div className="container profile" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/>
            <div className="cont-header">
                <div className="cont-label"><b>Skills</b></div>
                <p>I have excellent design & coding skills, as well as an ability to convert client 
                    requirements into an exciting online applications.</p>
                <div class="profile-skill">
                <div class="profile-skill-item">
                <p><b>HTML</b></p>
                <progress id="file" value="100" max="100"> 100% </progress>
                </div>
                <div class="profile-skill-item">
                <p><b>PHP</b></p>
                <progress id="file" value="75" max="100"> 75% </progress>
                </div>
                <div class="profile-skill-item">
                <p><b>CSS</b></p>
                <progress id="file" value="85" max="100"> 85% </progress>
                </div>
                <div class="profile-skill-item">
                <p><b>Wordpress/CMS</b></p>
                <progress id="file" value="80" max="100"> 80% </progress>
                </div>
                <div class="profile-skill-item">
                <p><b>Javascript</b></p>
                <progress id="file" value="70" max="100"> 70% </progress>
                </div>
                <div class="profile-skill-item">
                <p><b>Graphic Design</b></p>
                <progress id="file" value="50" max="100"> 50% </progress>
                </div>
            </div>
            </div>
            </div>

            <div className="container" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/>
            <div className="cont-header">
                <div className="cont-label"><b>Work Experience</b></div>
            </div>
            <div class='cont-workexp'>
                <h4>RipeConcepts - Wordpress Developer (July 2022 - Present)</h4>
                <p>RipeConcepts was founded by two award-winning entrepreneurs in 2008 with the sole aim of developing on-trend creative and tailored solutions for every client. 
                After initially offering graphic design, we have since expanded our pool of talents and expertise to web and app development, animation, digital marketing, and employee leasing.</p>
                <ul>
                    <li>8/F Ayala Center Cebu Tower, Cebu City, Philippines 6000</li>
                    <li>+63.32.495.1412</li>
                    <li><a href="https://ripeconcepts.com/" target="_blank">https://ripeconcepts.com/</a></li>
                </ul>
            </div>
            <div class='cont-workexp'>
                <h4>Freelancing - Web/Wordpress Developer (Sept 2020 - June 2022)</h4>
                <p>As a freelancer, I offer professional services in web development,
                     providing tailored solutions to clients seeking to establish or enhance their online presence.
                     With my expertise in coding, design, and functionality,
                     I create visually appealing and user-friendly websites that align with my client's needs and objectives.</p>
                <ul>
                    <li>Work From Home</li>
                    <li>09358245202</li>
                    <li>mmrkjhn@gmail.com</li>
                </ul>
            </div>
        </div>

            <div className="container" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/>
            <div className="cont-header">
                <div className="cont-label"><b>Gallery</b></div>
            </div>
            <div className="cont-grid3">
                <div>
                <img src="../img/320224027_858510095199047_1952014509904230253_n.jpg" onClick={e => showimginModal("../img/320224027_858510095199047_1952014509904230253_n.jpg", e)} class="profile-gallery-item" />
                </div>
                <div>
                <img src="../img/Background.png" onClick={e => showimginModal("../img/Background.png", e)} class="profile-gallery-item" />
                </div>
                <div>
                <img src="../img/45019849_2017634968257421_1325265004458409984_n.jpg" onClick={e => showimginModal("../img/45019849_2017634968257421_1325265004458409984_n.jpg", e)} class="profile-gallery-item" />
                </div>
                <div>
                <img src="../img/57882232_2269163846437864_2539751034142588928_n.jpg" onClick={e => showimginModal("../img/57882232_2269163846437864_2539751034142588928_n.jpg", e)} class="profile-gallery-item" />
                </div>
                <div>
                <img src="../img/79245807_2708148369206074_3298421569205829632_n.jpg" onClick={e => showimginModal("../img/79245807_2708148369206074_3298421569205829632_n.jpg", e)} class="profile-gallery-item" />
                </div>
                <div>
                <img src="../img/13529152_1130063880347872_6600976335067592380_n.jpg" onClick={e => showimginModal("../img/13529152_1130063880347872_6600976335067592380_n.jpg", e)} class="profile-gallery-item" />
                </div>
            </div>
            </div>

    <Modal className="modal" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal} 
        contentLabel="Example Modal"
      >
        <img src={photoinmodal} className="imginmodal" />
        <a className="closemodal" onClick={closeModal}>x</a>
    </Modal>


    </div>)
};


export default Profile;