import ReactDOM from 'react-dom';
import { Outlet, Link, useParams, useSearchParams, useNavigate  } from "react-router-dom";
import { useState, useEffect } from 'react';
import {onPageLoad, ContentHeader, cloudstorage, CloseSidenav} from "./CustomFunction.js";
import Axios from 'axios';


const Post = () => {

    const {postid} = useParams();
    const navigate = useNavigate();
    //const themecolor = localStorage.getItem("themecolor");
    const [content, setContent] = useState("");
    const [featuredimg, setFeaturedImg] = useState("");

    useEffect(() => {
        //document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.90)";
        loadPost(postid);
    },[]);

    const loadPost = (slug) => {
        document.getElementById('loadercont').style.display = "block";
        document.getElementById('content').style.display = "none";
        Axios.post('loadcontent',{
            'slug':  slug
        }).then((response)=>{
            const obj = response.data;
            if (!Object.keys(response.data).length) {
                navigate("/blogs");
            }
            else{
                ContentHeader(JSON.stringify(obj[Object.keys(obj)[1]]).slice(1, -1),"blogs");
                setContent(obj[Object.keys(obj)[3]]);
                setFeaturedImg(obj[Object.keys(obj)[4]]);
                document.getElementById('loadercont').style.display = "none";
                document.getElementById('content').style.display = "block";

                CloseSidenav();
            }
        });
    }
    return(<div className="post-content">
    <img className="post-featured-img" src={cloudstorage+"/data/featuredimg/"+featuredimg} />
    <div dangerouslySetInnerHTML={ {__html: content} } />
    </div>)};

export default Post;