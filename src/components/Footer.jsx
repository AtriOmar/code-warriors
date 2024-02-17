import React from "react";
// import "./footer.css";

const quickLinks01 = [
  {
    path: "#",
    display: "Developpement web ",
  },
  {
    path: "#",
    display: "Developpement mobile",
  },
  {
    path: "#",
    display: "Intelligence artificielle",
  },
  {
    path: "#",
    display: "Cybercecurity",
  },
  {
    path: "#",
    display: "Data",
  },
];

const quickLinks02 = [
  {
    path: "#",
    display: "Stackoverflow",
  },
  {
    path: "#",
    display: "Udemy",
  },
  {
    path: "#",
    display: "Coursera",
  },
  {
    path: "#",
    display: "Paragraph 3 Semi bold",
  },
  {
    path: "#",
    display: "Paragraph 3 Semi bold",
  },
];

const quickLinks03 = [
  {
    icon: "ri-home-line",
    display: "Zeramadine monastir",
  },
  {
    icon: "ri-mail-line",
    display: "Mehrezhoussem@gmail.com",
  },
  {
    icon: "ri-phone-fill",
    display: "+216 26 868 733",
  },
];

const Footer = () => {
  const year = new Date().getFullYear;
  return (
    <footer className="footer bg-purple-700 py-16">
      <div className="container">
        <div className="footer__wrapper flex justify-between gap-10">
          <div className="footer__logo w-1/5">
            <div className="logo h-full w-full">
              <img src="/logo.png" alt="" />
            </div>
          </div>
          <div className="footer__quick-links w-3/10">
            <div className="quick__links-title text-2xl font-bold mb-10">Categories</div>
            <ul className="quick__links">
              {quickLinks01.map((item, index) => (
                <li className="quick__links-item flex items-center mb-10" key={index}>
                  <a href={item.path} className="text-sm font-light transition-colors duration-200 hover:text-white">
                    {item.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__quick-links w-3/10">
            <div className="quick__links-title text-2xl font-bold mb-10">Ressources</div>
            <ul className="quick__links">
              {quickLinks02.map((item, index) => (
                <li className="quick__links-item flex items-center mb-10" key={index}>
                  <a href={item.path} className="text-sm font-light transition-colors duration-200 hover:text-white">
                    {item.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__quick-links w-3/10">
            <div className="quick__links-title text-2xl font-bold mb-10">Contact</div>
            <ul className="quick__links">
              {quickLinks03.map((item, index) => (
                <li className="quick__links-item flex items-center mb-10" key={index}>
                  <i className={item.icon} style={{ fontSize: "1.5rem" }}></i>
                  <p className="text-base">{item.display}</p>
                </li>
              ))}
            </ul>
            <div className="social flex items-center gap-4">
              <div className="social_item w-8 h-8">
                <a href=""></a>
              </div>
              <div className="social_item w-8 h-8">
                <a href=""></a>
              </div>
              <div className="social_item w-8 h-8">
                <a href=""></a>
              </div>
            </div>
          </div>
        </div>
        <p className="copyright text-sm">Copy Rights ENET’Com Junior Entreprise</p>
      </div>
    </footer>
  );
};

export default Footer;
