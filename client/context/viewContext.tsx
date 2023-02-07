import React, { createContext, ReactNode } from "react";
import useLiveNFT from "hooks/useLiveNFT";
import { Stream, StreamSession } from "@livepeer/react";
import { LiveNFT } from "types/general";
interface ContextType {
  address: string;
  stream: Stream | undefined;
  sessions: StreamSession[] | undefined;
  displayVodContent: boolean;
  setDisplayVodContent: (value: boolean) => void;
  activeSrc: string | undefined;
  setActiveSrc: (value: string | undefined) => void;
  lnftData: LiveNFT | null;
}

interface Props {
  address: string;
  children: ReactNode;
}

export const ViewContext = createContext<ContextType | undefined>(undefined);

export function ViewContextProvider(props: Props) {
  const { stream, lnftData, sessions } = useLiveNFT(props.address);
  const [displayVodContent, setDisplayVodContent] = React.useState(false);
  const activeSessions = sessions?.filter(
    (session) => session.recordingStatus === "ready"
  );
  const [activeSrc, setActiveSrc] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (stream && stream.isActive && stream.playbackUrl !== activeSrc) {
      setActiveSrc(stream.playbackUrl);
    }
  }, [stream]);

  React.useEffect(() => {
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
        lnftData,
      }}
    >
      {props.children}
    </ViewContext.Provider>
  );
}
