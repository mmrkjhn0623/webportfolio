import ReactDOM from 'react-dom';
import {onPageLoad, ContentHeader, cloudstorage, CloseSidenav} from "./CustomFunction.js";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Axios from "axios";
import ReactDOMServer from "react-dom/server";


const Blogs = () => {
    //const themecolor = localStorage.getItem("themecolor");
    const [blogList, setblogList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ContentHeader("Blogs","blogs");
        //document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";
        loadbloglist();
    },[]);

    const loadbloglist = () => {
        document.getElementById('loadercont').style.display = "block";
        document.getElementById('content').style.display = "none";
        Axios.get("getbloglist").then((response) => {
            const obj = response.data;
            if (!Object.keys(response.data).length) {
                navigate("/blogs");
            }
            else{
                setblogList(response.data);
                showContent();
                CloseSidenav();
            }
        });
    };

    const showContent = () => {
        document.getElementById('loadercont').style.display = "none";
        document.getElementById('content').style.display = "block";
    }

    return(<div id="bloglist" className="container" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/>

    <div className="cont-grid3">
      {
        blogList.map((val)=> {
            return (
                <div className="grid-content article" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/>
                <Link to={{ pathname: '/post/'+val.slug }}><img src={cloudstorage+"/data/featuredimg/"+val.featuredimg} class="featuredimg" /></Link>
                <div className="cont-header">
                <h4><Link to={{ pathname: '/post/'+val.slug }} className="cont-label">{val.title}</Link></h4>
                <p>{val.excerpt}</p>
                </div>  
                </div>
            );
        })
      }
    </div>
  </div>);

};


export default Blogs;