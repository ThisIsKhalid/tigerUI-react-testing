// src/components/__tests__/Navbar.test.tsx

import { render,screen } from "@testing-library/react";
import { setViewport } from "./utils/setViewport";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

const links = [
  { title: "Home", url: "/" },
  {
    title: "About",
    url: "/about",
    submenu: [
      { title: "Mission", url: "/mission" },
      { title: "Vision", url: "/vision" },
    ],
  },
  { title: "Contact", url: "/contact" },
];

-

describe("Navbar", () => {

  //! Responsive Design------------------
  it("renders correctly on desktop", () => {
    setViewport(1024, 768); // Set a desktop-like viewport size
    render(<Navbar links={links} />);
  });

  it("renders correctly on mobile", () => {
    setViewport(375, 812); // Set a mobile-like viewport size (iPhone X)
    render(<Navbar links={links} />);
  });

  //! Menu Items and Dropdowns----------------

  it("renders menu items without dropdowns", () => {
    render(<Navbar links={links} />);

    // const homeLink = screen.getByText("Home");
    // const aboutLink = screen.getByText("About");
    // const contactLink = screen.getByText("Contact");

      const homeLinks = screen.getAllByTestId("home-link");
      const aboutLinks = screen.getAllByTestId("about-link");
      const contactLinks = screen.getAllByTestId("contact-link");

    // expect(homeLink).toBeInTheDocument();
    // expect(aboutLink).toBeInTheDocument();
    // expect(contactLink).toBeInTheDocument();
    expect(homeLinks.length).toBe(1);
    expect(aboutLinks.length).toBe(1);
    expect(contactLinks.length).toBe(1);

    // Ensure mobile menu button is present
    const mobileMenuButton = screen.getByText("☰");
    expect(mobileMenuButton).toBeInTheDocument();

    // Ensure desktop menu is visible
    const desktopMenu = screen.getByTestId("desktop-menu");
    expect(desktopMenu).toHaveClass("show");

    // Ensure mobile menu is initially hidden
    const mobileMenu = screen.queryByTestId("mobile-menu");
    expect(mobileMenu).not.toHaveClass("show");
  });

  it("renders dropdowns for menu items with submenu", () => {
    render(<Navbar links={links} />);

    // const aboutLink = screen.getByText("About");
    // const missionLink = screen.getByText("Mission");
    // const visionLink = screen.getByText("Vision");

    const aboutLinks = screen.getAllByTestId("about-link");
    const missionLinks = screen.getAllByTestId("mission-link");
    const visionLinks = screen.getAllByTestId("vision-link");

    // Click on the "About" menu item to open the dropdown
    userEvent.click(aboutLinks[0]);


    // expect(missionLink).toBeInTheDocument();
    // expect(visionLink).toBeInTheDocument();

    expect(aboutLinks.length).toBe(1);
    expect(missionLinks.length).toBe(1);
    expect(visionLinks.length).toBe(1);

    // Ensure mobile menu button is present
    const mobileMenuButton = screen.getByText("☰");
    expect(mobileMenuButton).toBeInTheDocument();

    // Ensure mobile menu is visible
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("show");

    // Click on the mobile menu button again to hide the mobile menu
    userEvent.click(mobileMenuButton);

    // Ensure mobile menu is now hidden
    expect(mobileMenu).not.toHaveClass("show");
  });
});




