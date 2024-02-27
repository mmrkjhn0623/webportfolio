import { useState, useEffect } from 'react';

export function formatDate() {
    const current = new Date();
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const d = current;
    const year = d.getFullYear()
    const date = d.getDate()
    const monthIndex = d.getMonth()
    const monthName = months[d.getMonth()]
    const dayName = days[d.getDay()] // Thu
    const formatted = `${dayName}, ${date} ${monthName} ${year}`
    return formatted.toString();
}

export function onPageLoad(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('loadercont').style.display = "block";
    document.getElementById('content').style.display = "none";
    setTimeout(() => {
        document.getElementById('loadercont').style.display = "none";
        document.getElementById('content').style.display = "block";
        CloseSidenav();
      }, 1000);
};

export function ContentHeader(pagetitle,sidenav){
    document.getElementById("content-heading").innerHTML = pagetitle;
    
    const sidenavitem = document.querySelectorAll('.sidenav a');
    sidenavitem.forEach(sidenavitem => {
        if(sidenavitem.classList.contains('current')){
            sidenavitem.classList.remove('current')
        }
    });
    document.querySelector('a.sidenav-'+sidenav).classList.add("current");
};

export function ThemeSetup(){
    if(localStorage.getItem("theme")){
        document.body.classList = [];
        document.body.classList.add(localStorage.getItem("theme"));
    }
}
export const cloudstorage = 'https://storage.googleapis.com/mark-john-portfolio.appspot.com';

export function Menutoggled(){
    if (window.innerWidth <= 600){
        if (document.getElementById('sideNav').classList.contains('active')) {
            document.getElementById("sideNav").style.transition = "6.0s ease";
            document.getElementById("sideNav").style.width = "0px";
    
            document.getElementById('sideNav').classList.remove('active');
        }
        else {
            document.getElementById("sideNav").style.transition = "6.0s ease";
            document.getElementById("sideNav").style.width = "auto";
    
            document.getElementById('sideNav').classList.add('active');
        }
    }
}

export function CloseSidenav(){
    if (window.innerWidth > 600) {
      document.getElementById("sideNav").style.width = "auto";
      document.getElementById("sideNav").classList.add("active");
    }
    else {
        document.getElementById("sideNav").style.width = "0px";     
        document.getElementById("sideNav").classList.remove('active');
    }
}