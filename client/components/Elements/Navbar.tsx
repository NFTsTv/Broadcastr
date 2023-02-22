import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import Button from "components/Buttons/Button";
import ShareButton from "components/Share/Button";
import Image from "next/image";
import Logo from "public/logo.png";
const Navbar = ({ address }: { address: string }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a href="https://broadcastr.xyz">
          <Image
            src={Logo}
            alt="Logo"
            height={30}
            width={200}
            objectFit={"contain"}
          />
        </a>
      </div>

      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-1">
            <ViewOnPlatform address={address} />
            <ShareButton />
            <Button styles="btn-info">
              <a className="text-black no-underline">Know more</a>
            </Button>
          </ul>
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
            <ViewOnPlatform address={address} />
            <ShareButton />
            <Button styles="btn-info">
              <a className="text-black no-underline">Know more</a>
            </Button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
