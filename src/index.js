import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import Projects from "./pages/Projects.js";
import Tools from "./pages/Tools.js";
import Blogs from "./pages/Blogs.js";
import Other from "./pages/Other.js";
import Contact from "./pages/Contact.js";
import Settings from "./pages/Settings.js";
import Projectinfo from "./pages/Projectinfo.js";
import NoPage from "./pages/Nopage.js";
import Post from "./pages/Post.js";
import FiveArticles from './pages/post/FiveArticles.js';

export default function App() {

    const [isLoading, setLoading] = useState(true);
    const [themecolor, setThemeColor] = useState(localStorage.getItem("themecolor"));

    /* Axios.defaults.baseURL = "http://localhost:8000/"; */
    /* Axios.defaults.baseURL = "https://mark-john-portfolio-api.de.r.appspot.com"; */
    /* Axios.defaults.baseURL = "http://13.236.106.100:8080/"; */
    Axios.defaults.baseURL = "https://animated-pika-ce5a74.netlify.app/.netlify/functions/api/";
  
    function someRequest() { //Simulates a request; makes a "promise" that'll run for 2.5 seconds
      return new Promise(resolve => setTimeout(() => resolve(), 2500));
    } 
  
    useEffect(() => {
      someRequest().then(() => {
        const loaderElement = document.querySelector(".loader-container");
        if (loaderElement) {
          loaderElement.remove();
          setLoading(!isLoading);
        }
        setThemeColor(localStorage.getItem("themecolor"));
      });
    });
  
    if (isLoading) { //
      return null;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="tools" element={<Tools />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="other" element={<Other />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="projectinfo/:projid" element={<Projectinfo />} />
                    
                    <Route path="*" element={<NoPage />} />

                    <Route path="post/:postid" element={<Post />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

