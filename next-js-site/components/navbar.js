import Image from "next/image";
import Link from "next/link";
import LogoProjector from "./logoMaker";
import { useState } from "react";
import Script from 'next/script'; // necessary for ads manager

export default function Navbar() {
  // hides logo in mobile when navbar-toggle is clicked
  const [logoVisibility, setLogoVisibility] = useState(false);

  return (
    // "fixed w-full z-20 top-0 left-0" persist navabar on scrolling
    <nav className="flex flex-col sm:justify-center bg-ivy-red fixed w-full z-20 top-0 left-0">
      {!logoVisibility && (
        <div
          id="logoModifier1"
          className="container 
        sm:visible md:visible lg:hidden
        z-40 w-3/12 justify-center -mb-12 md:-mb-4 bg-ivy-red 
        "
        >
          <LogoProjector />
        </div>
      )}

      <nav
        className="z-0 navbar pb-3 navbar-expand-md  text-white 
        font-raleway font-medium p-0 navbar-dark uppercase"
        data-bs-theme="dark"
      >
        <div className="container-fluid bg-ivy-red mt-4">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              onClick={() => setLogoVisibility(!logoVisibility)} // hides logo in mobile when navbar-toggle is clicked
            ></span>
          </button>

          <div
            className="collapse navbar-collapse flex justify-evenly flex-col md:flex-row mt-10"
            id="navbarNav"
          >
            <ul className="navbar-nav text-white md:space-x-5 -mt-20 md:-mb-6">
              <li className="nav-item">
                <Link className="nav-link text-white hover:opacity-75" href="/#chart">
                  Welcome
                </Link>
              </li>
              

              <div
                className="hidden sm:hidden lg:block
              "
              >
                <LogoProjector />
              </div>

              <li className="nav-item">
                <Link
                  href={"/#contact-us"}
                  className="btn btn-light text-ivy-red uppercase font-semibold rounded-full"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="logoModifier" className="z-40 md:hidden ml-20 bg-ivy-red">
        <LogoProjector />
      </div>
      
    </nav>
  );
}


