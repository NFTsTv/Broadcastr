import Image from "next/image";
import Logo from "public/logo.png";
import { ReactNode } from "react";

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="navbar bg-base-100">
      <a className="navbar-start h-full m-auto" href="/">
          <Image
            src={Logo}
            alt="Logo"
            objectFit={"contain"}
            width={250}
            height={50}
          />
      </a>
      <div className="navbar-end"> 
        <div className="navbar-center hidden lg:flex h-full">
          <ul className="menu menu-horizontal px-1 space-x-1">{children}</ul>
        </div>
        <div className="dropdown dropdown-left dropdown-bottom">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 lg:hidden space-y-2"
          >
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
