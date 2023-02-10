import { useState } from "react";
import { State } from "hooks/useWebRtmp";

interface Props {
  goLive: () => void;
  disableVideo: () => void;
  switchCamera: () => void;
  status: State["state"];
}

const WebcamControl = ({ ...props }: Props) => {
  const [isLiveClicked, setIsLiveClicked] = useState(false);

  return (
    <ul className="menu menu-horizontal bg-base-200 m-auto rounded-box absolute bottom-0 right-0 left-0 shadow-xl">
      <li
        onClick={() => {
          props.goLive();
          setIsLiveClicked(!isLiveClicked);
        }}
        className={`${isLiveClicked && "shadow-xl bg-base-300"}`}
      >
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="35px"
            height="35px"
            fill="currentColor"
          >
            <path d="M 4.2246094 4.2246094 C 2.2336094 6.2166094 1 8.967 1 12 C 1 15.033 2.2336094 17.783391 4.2246094 19.775391 L 5.6386719 18.361328 C 4.0086719 16.731328 3 14.481 3 12 C 3 9.519 4.0086719 7.2686719 5.6386719 5.6386719 L 4.2246094 4.2246094 z M 19.775391 4.2246094 L 18.361328 5.6386719 C 19.991328 7.2686719 21 9.519 21 12 C 21 14.481 19.991328 16.731328 18.361328 18.361328 L 19.775391 19.775391 C 21.766391 17.783391 23 15.033 23 12 C 23 8.967 21.766391 6.2166094 19.775391 4.2246094 z M 7.0527344 7.0527344 C 5.7847344 8.3197344 5 10.07 5 12 C 5 13.93 5.7847344 15.680266 7.0527344 16.947266 L 8.4667969 15.533203 C 7.5607969 14.628203 7 13.378 7 12 C 7 10.622 7.5617969 9.3727969 8.4667969 8.4667969 L 7.0527344 7.0527344 z M 16.947266 7.0527344 L 15.533203 8.4667969 C 16.439203 9.3717969 17 10.622 17 12 C 17 13.378 16.438203 14.627203 15.533203 15.533203 L 16.947266 16.947266 C 18.214266 15.679266 19 13.93 19 12 C 19 10.07 18.215266 8.3197344 16.947266 7.0527344 z M 12 9 A 3 3 0 0 0 12 15 A 3 3 0 0 0 12 9 z" />
          </svg>
        </a>
      </li>
      <li onClick={props.switchCamera}>
        <a>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            viewBox="0 0 122.879 93.242"
            fill="currentColor"
          >
            <g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M51.933,0.036h31.521l7.185,12.79h14.794c0.786,0,1.428,0.662,1.428,1.429v35.003 c5.257,1.931,9.185,4.161,11.755,6.539c2.808,2.599,4.234,5.514,4.264,8.602c0.03,3.092-1.35,6.024-4.156,8.649 c-4.786,4.479-14.429,8.444-28.976,10.897c-1.671,0.277-3.223-1.036-3.467-2.935s0.911-3.662,2.582-3.94 c13.403-2.26,22.011-5.655,25.986-9.375c1.301-1.216,1.942-2.312,1.934-3.242c-0.009-0.936-0.684-2.043-2.017-3.276 c-1.765-1.633-4.401-3.2-7.905-4.633v7.618c0,0.766-0.66,1.428-1.428,1.428H19.506c-0.767,0-1.429-0.643-1.429-1.428v-8.5 c-5.576,1.91-9.059,4.052-10.86,6.261c-1.003,1.23-1.261,2.413-0.937,3.497c0.472,1.573,1.877,3.242,3.958,4.875 c7.076,5.552,20.555,9.51,33.239,8.611l-2.744-2.146c-1.311-1.023-1.544-2.917-0.52-4.228c1.024-1.312,2.917-1.544,4.229-0.521 l8.878,6.942c1.311,1.024,1.544,2.917,0.52,4.229c-0.132,0.17-0.279,0.32-0.438,0.454l-9.882,8.837 c-1.239,1.109-3.143,1.003-4.252-0.236c-1.108-1.238-1.003-3.143,0.236-4.251l2.28-2.039C28.4,86.376,14.414,81.996,6.771,76 c-3.146-2.468-5.364-5.305-6.277-8.353c-1.06-3.537-0.466-7.092,2.251-10.425c2.599-3.188,7.505-6.194,15.332-8.696V14.255 c0-0.786,0.642-1.429,1.429-1.429h6.652v-4.59h8.22v4.59h8.928c1.858-3.667,3.715-7.335,5.574-11 C50.01-0.411,49.389,0.036,51.933,0.036L51.933,0.036z M97.607,19.144c2.353,0,4.261,1.909,4.261,4.262s-1.908,4.262-4.261,4.262 s-4.262-1.909-4.262-4.262S95.255,19.144,97.607,19.144L97.607,19.144L97.607,19.144z M66.229,24.113 c7.134,0,12.919,5.785,12.919,12.918s-5.785,12.917-12.919,12.917c-7.135,0-12.92-5.785-12.92-12.917 C53.31,29.898,59.094,24.113,66.229,24.113L66.229,24.113z M66.229,15.696c11.782,0,21.336,9.555,21.336,21.335 s-9.554,21.336-21.336,21.336c-11.781,0-21.335-9.556-21.335-21.336S54.448,15.696,66.229,15.696L66.229,15.696z"
              />
            </g>
          </svg>
        </a>
      </li>
      <li onClick={props.disableVideo}>
        <a>
          <svg
            width="35px"
            height="35px"
            viewBox="0 0 24 24"
            id="video_disabled"
            data-name="video disabled"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"

          >
            <rect
              id="Rectangle_4"
              data-name="Rectangle 4"
              width="24"
              height="24"
              fill="none"
            />
            <rect
              id="Combined_Shape"
              data-name="Combined Shape"
              width="13"
              height="11"
              transform="translate(3 8)"
              fill="none"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            />
            <path
              id="Rectangle_3"
              data-name="Rectangle 3"
              d="M0,1.732,4.684.171A1,1,0,0,1,6,1.119V6.345a1,1,0,0,1-1.316.949L0,5.732Z"
              transform="translate(16 10.268)"
              fill="none"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            />
            <path
              id="Line"
              d="M0,.75H7"
              transform="translate(5.5 4)"
              fill="none"
              stroke="#fff"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            />
            <path
              id="Path_4"
              data-name="Path 4"
              d="M18.936,0,0,16.233"
              transform="translate(1.19 4.632)"
              fill="none"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            />
          </svg>
        </a>
      </li>
      <li className="p-5 animate-pulse">{props.status}</li>
    </ul>
  );
};

export default WebcamControl;
