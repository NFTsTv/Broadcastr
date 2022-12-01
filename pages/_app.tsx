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
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../components/mainLayout";

console.log(process.env.LIVEPEER_API_KEY)
const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: process.env.NEXT_ALCHEMY_API_KEY }), publicProvider()]
);

const client = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_LIVEPEER_API_KEY }),
});

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
  return (
    <LivepeerConfig client={client}>
      <WagmiConfig client={wagmiClient}>
        <Head> NFTsTv </Head>
        <RainbowKitProvider chains={chains}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </RainbowKitProvider>
      </WagmiConfig>
    </LivepeerConfig>
  );
}

export default MyApp;
