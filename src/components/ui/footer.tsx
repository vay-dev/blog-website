// import React from 'react'
import CusBorder from "./border";
import "./styles/footer.scss";

const CusFooter = () => {
  const socialIcons = [
    "fa-brands fa-whatsapp",
    "fa-brands fa-discord",
    "fa-brands fa-linkedin",
    "fa-brands fa-telegram",
    "fa-brands fa-twitter",
  ];

  return (
    <footer id="footer" className="container-fluid mt-5">
      <CusBorder className="cus-border2">
        <img src="/vector.png" alt="" />
      </CusBorder>
      <div className="container-fluid" id="icon-con">
        <span className="footer-text">
          Copyright &copy; 2025 <b>EchoFeed</b>
        </span>
        <div className="icons-wrapper">
          {socialIcons.map((icon, idx) => (
            <span key={idx}>
              <i className={icon}></i>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default CusFooter;
