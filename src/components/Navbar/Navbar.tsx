import React, { useEffect, useState } from "react";
import "./Navbar.css";

interface NavLink {
  title: string;
  url: string;
  submenu?: NavLink[];
}

interface NavbarProps {
  links: NavLink[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // (adjust as needed)
    };

    checkIsDesktop();

    // Add event listener to check for window resize and update isDesktop state accordingly
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      // Remove the event listener on component unmount
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  return (
    <nav>
      <div
        className={`mobile-menu-button ${showMobileMenu ? "active" : ""}`}
        onClick={handleMobileMenuToggle}
      >
        ☰
      </div>
      <ul
        className={`menu ${isDesktop && showMobileMenu ? "show" : ""}`}
        data-testid="desktop-menu"
      >
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} data-testid={link.title.toLowerCase() + "-link"}>
              {link.title}
            </a>
            {link.submenu && (
              <ul data-testid="submenu">
                {" "}
                {/* Add data-testid for the submenu */}
                {link.submenu.map((sublink) => (
                  <li key={sublink.url}>
                    <a
                      href={sublink.url}
                      data-testid={sublink.title.toLowerCase() + "-link"}
                    >
                      {sublink.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <ul
        className={`menu-mobile ${showMobileMenu ? "show" : ""}`}
        data-testid="mobile-menu"
      >
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url}>{link.title}</a>
            {link.submenu && (
              <ul>
                {link.submenu.map((sublink) => (
                  <li key={sublink.url}>
                    <a href={sublink.url}>{sublink.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
