import { onPageLoad, ContentHeader } from "./CustomFunction.js";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Axios from "axios";
import emailjs from "@emailjs/browser";

Modal.setAppElement("#root");

const Contact = () => {
  //const themecolor = localStorage.getItem("themecolor");

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  useEffect(() => {
    onPageLoad();
    ContentHeader("Contact Me", "contact");
    // document.getElementById("overlay").style.backgroundColor = "rgba("+themecolor+",0.60)";
  }, []);

  const SendMessage = (e) => {
    e.preventDefault();
    document.getElementById("messagesend").value = "Sending...";
    document.getElementById("messagesend").disabled = true;
    // Axios.post("newmessage", {
    //   name: document.getElementById("name").value,
    //   email: document.getElementById("email").value,
    //   message: document.getElementById("message").value,
    // }).then(() => {
    //   setTimeout(() => {
    //     document.getElementById("messagesend").value = "Send!";
    //     document.getElementById("messagesend").disabled = false;
    //     openModal();
    //   }, 2000);
    // });
    emailjs
      .send(
        "service_ar0ifgb",
        "template_tgio32o",
        {
          from_name: document.getElementById("name").value,
          to_name: "MJ",
          message: document.getElementById("message").value,
          reply_to: document.getElementById("email").value,
        },
        {
          publicKey: "lR9LmmL0XNeKWf5V5",
        }
      )
      .then(() => {
        setTimeout(() => {
          document.getElementById("messagesend").value = "Send!";
          document.getElementById("messagesend").disabled = false;
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
          openModal();
        }, 2000);
      });
  };

  return (
    <>
      <div
        className="container"
        style={{ maxWidth: "680px", marginBottom: "120px" }}
      >
        <div className="cont-header">
          <span className="cont-label">
            <b>Let's work together!</b>
          </span>
          <p>
            Like my work and want something similar for your company? Sure,
            let's get to business.
          </p>
        </div>
        <form className="contactform" onSubmit={SendMessage}>
          <div className="form-group">
            <input type="text" id="name" placeholder="Your Name" required />
            <input type="email" id="email" placeholder="Your Email" required />
          </div>
          <textarea placeholder="Your Message" id="message" required></textarea>
          <input type="submit" value="Send!" id="messagesend" />
        </form>
      </div>
      <div>
        <Modal
          className="modal" /*style={{backgroundColor: "rgba("+themecolor+",0.60)"}}*/
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <h2>
            Thank you for sending message, I'll reach out with you as soon as
            possible.{" "}
          </h2>
          <a href="#" className="closemodal" onClick={closeModal}>
            x
          </a>
        </Modal>
      </div>
    </>
  );
};

export default Contact;
