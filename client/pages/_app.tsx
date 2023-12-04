import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { createPublicClient, http } from "viem";
import { ModalContextProvider } from "context/modalContext";
import { AlertContextProvider } from "context/alertContext";
import { Layout } from "components/Elements/Layout";
import { currentChain } from "utils/constants";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

if (
  !process.env.NEXT_PUBLIC_INFURA_API_KEY ||
  !process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
) {
  throw new Error("ALCHEMY_ID env variable is required");
}

const { chains, publicClient } = configureChains(
  [currentChain],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Broadcastr",
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const client = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY ?? "",
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LivepeerConfig client={client}>
      <WagmiConfig config={wagmiConfig}>
        <Head> broadcastr </Head>
        <RainbowKitProvider chains={chains}>
          <AlertContextProvider>
            <ModalContextProvider>
              <Layout>
                <Component {...pageProps} />
                <Analytics />
              </Layout>
            </ModalContextProvider>
          </AlertContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </LivepeerConfig>
  );
}

export default MyApp;
