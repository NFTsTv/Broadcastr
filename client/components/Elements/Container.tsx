import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center w-80 h-full space-y-4 m-auto relative">
      {children}
    </div>
  );
}
