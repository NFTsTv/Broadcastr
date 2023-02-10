import { createContext, ReactNode, useEffect, useState } from "react";
import useCastr from "hooks/useCastr";
import { Stream, StreamSession } from "@livepeer/react";
import { Castr } from "types/general";

interface ContextType {
  address: string;
  stream: Stream | undefined;
  sessions: StreamSession[] | undefined;
  displayVodContent: boolean;
  setDisplayVodContent: (value: boolean) => void;
  activeSrc: string | undefined;
  setActiveSrc: (value: string | undefined) => void;
  CastrData: Castr | null;
}

interface Props {
  address: string;
  children: ReactNode;
}

export const ViewContext = createContext<ContextType | undefined>(undefined);

export function ViewContextProvider(props: Props) {
  const { stream, CastrData, sessions } = useCastr(props.address);
  const [displayVodContent, setDisplayVodContent] = useState(false);
  const activeSessions = sessions?.filter(
    (session) => session.recordingStatus === "ready"
  );
  const [activeSrc, setActiveSrc] = useState<string | undefined>();

  useEffect(() => {
    if (stream && stream.isActive && stream.playbackUrl !== activeSrc) {
      setActiveSrc(stream.playbackUrl);
    }
  }, [stream]);

  useEffect(() => {
    setActiveSrc(undefined);
  }, [displayVodContent]);

  return (
    <ViewContext.Provider
      value={{
        address: props.address,
        stream,
        sessions: activeSessions,
        displayVodContent,
        setDisplayVodContent,
        activeSrc,
        setActiveSrc,
        CastrData,
      }}
    >
      {props.children}
    </ViewContext.Provider>
  );
}
