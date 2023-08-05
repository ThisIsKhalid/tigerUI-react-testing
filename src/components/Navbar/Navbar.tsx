import React, { useState } from "react";

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

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  return (
    <nav>
      <div
        className={`mobile-menu-button ${showMobileMenu ? "active" : ""}`}
        onClick={handleMobileMenuToggle}
      >
        ☰
      </div>
      <ul
        className={`menu ${showMobileMenu ? "show" : ""}`}
        data-testid="desktop-menu"
      >
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} data-testid={link.title.toLowerCase() + "-link"}>
              {link.title}
            </a>
            {link.submenu && (
              <ul>
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

//* in ul ->  data-testid : This attribute will be used in the test case to check for the visibility of the desktop menu.
