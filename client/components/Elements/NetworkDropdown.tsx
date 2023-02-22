import { ReactNode } from "react";
import Button from "components/Buttons/Button";
const NetworkDropdown = ({ children }: { children: ReactNode }) => {
  
  return (
    <div className="dropdown dropdown-top">
      <Button tabIndex={0}>Markets</Button>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-trasnparent rounded-box w-60 bg-base-100 space-y-2 items-center justify-center mt-2"
      >
        {children}
      </ul>
    </div>
  );
};

export default NetworkDropdown;
