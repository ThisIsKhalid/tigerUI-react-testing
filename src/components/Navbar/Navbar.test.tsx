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
     expect(desktopMenu).toHaveClass("menu"); // Change "show" to "menu"
   });

   it("renders correctly on mobile", () => {
     setViewport(375, 812); // Set a mobile-like viewport size (iPhone X)
     render(<Navbar links={links} />);
     const mobileMenu = screen.getByTestId("mobile-menu");
     expect(mobileMenu).toHaveClass("menu-mobile"); // Change "show" to "menu-mobile"
   });

  //! Menu Items and Dropdowns----------------

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
    expect(desktopMenu).toHaveClass("show");

    // Ensure mobile menu is initially hidden
    const mobileMenu = screen.queryByTestId("mobile-menu");
    expect(mobileMenu).not.toHaveClass("show");
  });

  it("renders dropdowns for menu items with submenu", () => {
    render(<Navbar links={links} />);

    const aboutLinks = screen.getAllByTestId("about-link");
    userEvent.click(aboutLinks[0]);

    const submenus = screen.queryAllByTestId("about-submenu");
    expect(submenus.some((submenu) => submenu.classList.contains("show"))).toBe(
      true
    );
    const mobileMenuButton = screen.getByText("☰");
    expect(mobileMenuButton).toBeInTheDocument();

    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("show");

    userEvent.click(mobileMenuButton);

    expect(mobileMenu).not.toHaveClass("show");
  });
});
