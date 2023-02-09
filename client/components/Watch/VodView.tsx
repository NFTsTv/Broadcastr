import { useContext } from "react";
import { ViewContext } from "context/viewContext";
import moment from "moment";
import { StreamSession } from "@livepeer/react";

const VodView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    return <div>loading</div>;
  }
  const { sessions, setActiveSrc } = context;

  if (!sessions) {
    return <div>no sesssions available</div>;
  }

  const handleWatch = (session: StreamSession) => {
    setActiveSrc(session.recordingUrl);
  };

  return (
    <div className=" flex flex-row items-center justify-center h-screen w-screen">
      {sessions.map((session) => {
        return (
          <div className="card w-96 bg-base-200 shadow-xl m-5">
            <figure className="px-10 pt-10">
              <img
                src="https://placeimg.com/400/225/arch"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                {moment(session.createdAt).format("MMMM Do YYYY, h:mm a")}
              </h2>
              <div className="card-actions">
                <button
                  className="btn btn-warning"
                  onClick={() => handleWatch(session)}
                >
                  Watch
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VodView;
