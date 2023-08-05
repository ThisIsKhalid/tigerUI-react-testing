import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { setViewport } from "./utils/setViewport";

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

describe("Navbar", () => {
  //! Responsive Design------------------
  it("renders correctly on desktop", () => {
    setViewport(1024, 768); // Set a desktop-like viewport size
    render(<Navbar links={links} />);
    const desktopMenu = screen.getByTestId("desktop-menu");
    expect(desktopMenu).toHaveClass("menu");
  });

  it("renders correctly on mobile", () => {
    setViewport(375, 812); // Set a mobile-like viewport size (iPhone X)
    render(<Navbar links={links} />);
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("menu-mobile");
  });

  //! Menu Items and Dropdowns  && Mobile Navigation----------------

  it("renders menu items without dropdowns", () => {
    render(<Navbar links={links} />);

    // Ensure all menu items are present without dropdowns
    const homeLink = screen.getByTestId("home-link");
    const aboutLink = screen.getByTestId("about-link");
    const contactLink = screen.getByTestId("contact-link");
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    // Ensure mobile menu button is present
    const mobileMenuButton = screen.getByText("☰");
    expect(mobileMenuButton).toBeInTheDocument();

    // Ensure desktop menu is visible
    const desktopMenu = screen.getByTestId("desktop-menu");
    expect(desktopMenu).toHaveClass("menu");

    // Ensure mobile menu is initially hidden
    const mobileMenu = screen.queryByTestId("mobile-menu");
    expect(mobileMenu).not.toHaveClass("show");
  });

  it("renders dropdowns for menu items with a submenu", () => {
    render(<Navbar links={links} />);

    // Click on the "About" link to reveal the submenu
    const aboutLink = screen.getByTestId("about-link");
    userEvent.click(aboutLink);

    // Ensure there is at least one submenu
    const submenu = screen.queryByTestId("submenu");
    expect(submenu).toBeInTheDocument();

    // Ensure the submenu is visible
    expect(submenu).toBeVisible();

    // Click on the mobile menu button to hide the mobile menu
    const mobileMenuButton = screen.getByText("☰");
    userEvent.click(mobileMenuButton);

    // Ensure the mobile menu is hidden
    const mobileMenu = screen.queryByTestId("mobile-menu");
    expect(mobileMenu).not.toHaveClass("show");
  });
});
