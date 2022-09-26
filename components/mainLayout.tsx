import React from "react";
//import Navigation from "./Navbar";
// todo type for children
const MainLayout = (children: any) => {


  return (
    <div className="">
      <div className="flex flex-col">
        <div className="h-1/4 md:w-1/4 bg-gray-400">

        </div>
        <div className="h-full w-full md:overflow-x-scroll md:overflow-auto bg-red-600">
          {children}
        </div>
      </div>
    </div>
  )
}


export default MainLayout