import {onPageLoad, ContentHeader} from "./CustomFunction.js";
import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';
// import { Insta } from './insta.html';

const Other = () => {
    const themecolor = localStorage.getItem("themecolor");
    const instacontent = "<h3>Ongkiko</h3>";

    useEffect(() => {
        onPageLoad();
        ContentHeader("Other Stuffs");
        document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";
    });
    // const root = ReactDOM.createRoot(document.getElementById('forinsta'));
    // root.render(Insta);

    return (<>
        <div className="container" style={{backgroundColor: "rgba("+themecolor+",0.60)"}}>
            <div className="cont-header">
                <span className="cont-label"><b>Projects</b></span>
                <a href="#" className="cont-upperright">See More</a>   
            </div>
            <div dangerouslySetInnerHTML={ {__html: instacontent} } />
        </div>
    </>)

};


export default Other;