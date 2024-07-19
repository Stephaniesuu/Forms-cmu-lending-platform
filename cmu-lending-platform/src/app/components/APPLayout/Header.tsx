import React from "react";
import PropTypes from "prop-types";
import { ConnectButton } from "@rainbow-me/rainbowkit";



export default function Navbar() {
  const routes = [
    { name: "Home", href: "#", isActive: true },
    { name: "Services", href: "#", isActive: false },
    { name: "Why us?", href: "#", isActive: false },
    { name: "How It Works", href: "#", isActive: false },
  ];

const NavMenu = ({ routes }: { routes: { name: string; href: string; isActive: boolean }[] }) => (
  <ul className="flex">
    {routes.map((route, i) => (
      <li key={i}>
        <a
          className={`px-4 ${route.isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
            }`}
          href={route.href}
        >
          {route.name}
        </a>
      </li>
    ))}
  </ul>
);

NavMenu.propTypes = {
  routes: PropTypes.array.isRequired,
};

const AuthNavMenu = () => (
  <div className="flex items-center gap-4">
    <ConnectButton
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />

    </div>


);

const Navigation4 = () => {
  return (
    <div className=" glass ezy__nav4 light py-6 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative">
      <nav>
        <div className="container px-4">
          <div className="flex items-center justify-between">
            <a className="font-black text-3xl min-w-[33%] border-spacing-1" href="#!">
              {" "}
              CMU{" "}
            </a>
            <button
              className="block lg:hidden cursor-pointer h-10 z-20"
              type="button"
              id="hamburger"
            >
              <div className="h-0.5 w-7 bg-black dark:bg-white -translate-y-2"></div>
              <div className="h-0.5 w-7 bg-black dark:bg-white"></div>
              <div className="h-0.5 w-7 bg-black dark:bg-white translate-y-2"></div>
            </button>
            <div
              className="flex flex-col lg:flex-row justify-center lg:justify-between items-center text-3xl gap-6 lg:text-base lg:gap-2 absolute h-screen w-screen top-0 left-full lg:left-0 lg:relative lg:h-auto lg:w-auto bg-white dark:bg-[#0b1727] lg:bg-transparent grow"
              id="navbar"
            >
              <NavMenu routes={routes} />
              <AuthNavMenu />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

  return (
    <header className="header">
      <Navigation4 /> 
    </header>
  );
}