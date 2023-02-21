import { ReactNode } from "react";

const NetworkDropdown = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dropdown dropdown-start">
      <label tabIndex={0} className="btn bg-secondary text-black">
        Markets
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-trasnparent rounded-box w-60 bg-base-100 space-y-2 items-center justify-center"
      >
        {children}
      </ul>
    </div>
  );
};

export default NetworkDropdown;
