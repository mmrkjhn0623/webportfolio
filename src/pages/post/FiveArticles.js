import {ContentHeader, onPageLoad} from "../CustomFunction.js";
import { useState, useEffect } from 'react';

const FiveArticles = () => {

    const themecolor = localStorage.getItem("themecolor");
    useEffect(() => {
        onPageLoad();
        ContentHeader("5 Articles Every Web Developer Should Read in 2022");
        document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.90)";
    },[]);
    return(<div className="post-content">
    <p>My collection of some interesting and insightful articles for web developers and people learning web development</p>
    <img src="../data/featuredimg/0_TxYDX8EpaDyOgJA7.png" class="featuredimg" />
    <p>Hello folks, how are you doing? I am back again with my list of 10 articles everyone should read. In the past, I have shared 10 articles every programmer should read, which has was loved a lot by you guys, and many readers appreciated and says they benefited a lot from them.<br/><br/>

I can understand that becuase the feeling of discovering a great article is similar to finding gold in a salt-mine. The internet is full of tutorials and resources, but not all of them are good, and with such huge numbers, it has become increasingly difficult to find good resources, or should I call the gem of articles, which everybody wants to read.<br/><br/>

That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.<br/><br/>

Another thing is that technology changes very fast, whatever I knew about web development 10 years ago is not enough in today’s world of modern web development, and I need to keep myself updated.<br/><br/>

This is the situation of many programmers and web developers out there, but updating yourself and keeping pace with the technology is not really easy. It’s much easier said than done.<br/><br/>

I know online courses from Udemy, Coursera, Educative, and Pluarslight are great and the main resource to keep yourself up-to-date with a new set of technology, but at the same time, they are time-consuming. You need at least 10 hours to consume a 3-hour course or sometimes even more, and that’s where this well-written, insightful article helps.<br/><br/>

<h3>10 Best Articles Every Web Developer Should Read in 2022</h3>
Anyway, without wasting any more of your time, here is my list of 10 articles every web developer should read:<br/><br/>

<h4>1. Modern JavaScript Explained For Dinosaurs</h4>
This is probably the best explanation I’ve ever seen about modern frontend development workflow, and if you are new to JavaScript or web development, you must read this article.<br/><br/>

You will learn so much about JavaScript by just reading this one article. If you have looked at JavaScript 10 years ago and want to get up-to-speed quickly, definitely read this article<br/><br/>

And, if you want to learn more about JavaScript The Complete JavaScript Course by Jonas Schemdtmann on Udemy is the best course for web developers.<br/><br/>
<img src="https://miro.medium.com/max/720/0*2Po4w4EsC7Ubsx78.png"/><br/><br/>
best tutorial to learn Modern JavaScript<br/><br/>
Images from Dinosaur Comics by Ryan North<br/><br/>
<h4>2. The Web Developer RoadMap</h4>
This is not just an article of the sort but a fantastic resource on what it takes to become a Web developer. It lists all the technologies and tools a Web developer should be familiar with.<br/><br/>

I really liked those mind-maps which appear now in many other places on the web. It effectively complements The Web Developer Bootcamp course, which teaches you most of the technologies mentioned in this roadmap.<br/><br/>
<img src="https://miro.medium.com/max/720/0*2SgCHqh-j3YaiPdn.png"/><br/>
<h4>3. Web Architecture 101</h4>
The basic architecture concepts which I believe every web developer should learn and understand. If you have just started with web development, you may find it complicated, but it’s worth reading. I won’t say much, as the below diagram says it all.<br/><br/>

I always try to understand the flow before doing any change or while debugging issues. Once you know workflow like where is the input coming from, where is the logic and data, and how the response is returned makes a lot of difference in your day-to-day work.<br/><br/>

And, If you’re looking for a complete course on web application and software architecture, I recommend checking out Web Application and Software Architecture 101. This is a useful course for anyone looking to strengthen their overall knowledge of software architecture.<br/><br/>

<img src="https://miro.medium.com/max/640/0*pDLuKkMTuLK2-nIb.png"/><br/><br/>
And, if you find Educative platform and their Grokking courses like Grokking the System Design Interview and Grokking the Coding Interview Patterns then consider getting the Educative Subscription which provides access to their 100+ courses in just $14.99 per month. It’s very cost-effective and great for preparing for coding interviews.

<h3>4. Modern CSS Explained For Dinosaur</h3>
This is another masterpiece from Peter Jang, author of the very first article in this list, but this time, he has covered CSS, another pillar of web development.<br/><br/>

To be honest, like JavaScript, CSS has also changed a lot, and if you haven’t used CSS for a long time, this article will bring you up to speed.<br/><br/>

And, if you want to learn more, in a much-structured way, this Advanced CSS and Sass: Flexbox, Grid, and more by Jonas Schedtmann is another great resource to follow-up. The best thing is that both of these articles are free articles on Medium.<br/><br/>
<img src="https://miro.medium.com/max/720/0*otNh3jGpsfNZM_J7.png"/><br/><br/>
<h3>5. Learn these JavaScript fundamentals and become a better developer</h3>
The power of JavaScript lies in its simplicity, and Knowing the JavaScript fundamentals makes us better at understanding and using the language. This article will teach you some JavaScript fundamentals which many web developers overlook.<br/><br/>

If you want to learn more, you can also read the author’s Discover Functional JavaScript book, which was named one of the best new Functional Programming books by BookAuthority!<br/><br/><br/><br/>

</p>
</div>);
}

export default FiveArticles;