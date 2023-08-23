"use client";
import { useState, useEffect } from "react";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "@hooks/etherRPC";

const clientId =
  "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk";

const LOGIN_PROVIDER = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  TWITTER: "twitter",
  GITHUB: "github",
  LINKEDIN: "linkedin",
  REDDIT: "reddit",
  DISCORD: "discord",
  TWITCH: "twitch",
  APPLE: "apple",
  EMAIL: "email_passwordless",
};

export default function useWeb3Auth() {
  const init = async () => {
    try {
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1",
        rpcTarget: "https://rpc.ankr.com/eth",
        displayName: "Ethereum Mainnet",
        blockExplorer: "https://goerli.etherscan.io",
        ticker: "ETH",
        tickerName: "Ethereum",
      };
      const web3authInstance = new Web3AuthNoModal({
        clientId,
        chainConfig,
        web3AuthNetwork: "cyan",
      });

      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });

      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
      });
      web3authInstance.configureAdapter(openloginAdapter);

      const provider = web3authInstance.provider;

      await web3authInstance.init();

      return { web3authInstance, provider };
    } catch (error) {
      console.error(error);
    }
  };

  const checkLogin = async (web3authInstance) => {
    if (web3authInstance && web3authInstance.connectedAdapterName) {
      return true;
    }
    return false;
  };

  const login = async (web3auth) => {
    if (!web3auth) {
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: LOGIN_PROVIDER.GOOGLE,
      }
    );
    return web3authProvider;
  };

  const loginWithEmail = async (web3auth, email) => {
    if (!web3auth || email.length === 0) {
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: LOGIN_PROVIDER.EMAIL,
        extraLoginOptions: {
          login_hint: email,
        },
      }
    );
    return web3authProvider;
  };

  const getUserInfo = async (web3auth) => {
    if (!web3auth) {
      return;
    }
    const user = await web3auth.getUserInfo();
    return user;
  };

  const logout = async (web3auth) => {
    if (!web3auth) {
      return;
    }
    await web3auth.logout();
  };

  const signMessage = async () => {
    if (!provider) {
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    return signedMessage;
  };

  const getPublicKey = async (provider) => {
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    return address;
  };

  const getPrivateKey = async (provider) => {
    if (!provider) {
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    return privateKey;
  };

  return {
    init,
    checkLogin,
    login,
    loginWithEmail,
    getUserInfo,
    logout,
    signMessage,
    getPublicKey,
    getPrivateKey,
  };
}