import React from "react";

const Modal = ({
  onExit,
  children,
}: {
  onExit: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex absolute top-0 right-0 z-20 w-full h-full m-0 overflow-hidden">
      <div className=" bg-base-100 p-8 rounded-lg relative mt-4">
        <div
          className=" text-white absolute top-0 left-0 px-5 cursor-pointer"
          onClick={() => onExit()}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 26.676 26.676"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
C26.18,21.891,26.141,21.891,26.105,21.891z"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
