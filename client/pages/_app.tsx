import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import Router from "components/Router";

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const client = createReactClient({
    provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY }),
    storage: {
      getItem: (key, defaultState) => {
        return defaultState;
      },
      setItem: (key, defaultState) => {
        return defaultState;
      },
      removeItem: (key) => {},
    },
  });
  return (
    <LivepeerConfig client={client}>
      <WagmiConfig client={wagmiClient}>
        <Head> NFTsTv </Head>
        <RainbowKitProvider chains={chains}>
          <Router>
            <Component {...pageProps} />
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </LivepeerConfig>
  );
}

export default MyApp;
