import { ReactNode } from "react";
import Button from "components/Buttons/Button";
const NetworkDropdown = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dropdown dropdown-start">
      <Button styles="btn-secondary">
        <label tabIndex={0}>Markets</label>
      </Button>
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
