"use client";
import useWeb3Auth from "@hooks/useWeb3Auth";
import { useState, useEffect, useRef } from "react";
import { setGlobalState, useGlobalState, getGlobalState } from "@store";
import { BsArrowRight } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ethers } from "ethers";
import { useConnect, useAccount } from "wagmi";
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import {
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

var projId = "7a99dce825d9493a1453dd01dbca4ca3"
function Step() {
  const { connect, error, isConnecting, pendingConnector } =
  useConnect()

  // const { connectors, connectAsync } = useConnect();

  const { address } = useAccount();

  const connectExternal = async (index) => {
    try {
      if (!address) {
        await connectAsync({ connector: connectors[index] });
        setGlobalState("stepCount", 3);
        setGlobalState("loginType", "external");
      } else {
        setGlobalState("stepCount", 3);
        setGlobalState("loginType", "external");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const connector = new WalletConnectConnector({
    // chains:[goerli],
    options: {
      projectId: projId,metadata:{
        name:'b-Wallet',
        description:'b-Wallet',
        url:'https://b-wallet.vercel.app',
        icons:['/assets/logo2.png']
      }
    },
  })

  return (
    <div className="mt-4 flex flex-col gap-3 pb-4">
      <div
        style={{
          background:
            "linear-gradient(180deg, #1E1E1E 0%, #141414 100%),linear-gradient(0deg, #EA13F2, #EA13F2)",
        }}
        className="text-sm flex items-center justify-center rounded-full py-1 shadow-xl"
        onClick={() => connectExternal(0)}
      >
        Metamask
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, #1E1E1E 0%, #141414 100%),linear-gradient(0deg, #EA13F2, #EA13F2)",
        }}
        className="text-sm flex items-center justify-center rounded-full py-1"
        onClick={() => connectExternal(1)}
      >
        Coinbase
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, #1E1E1E 0%, #141414 100%),linear-gradient(0deg, #EA13F2, #EA13F2)",
        }}
        className="text-sm flex items-center justify-center rounded-full py-1"
        onClick={() => connect(connector)}
      >
        WalletConnect
      </div>

      <div
        style={{
          background:
            "linear-gradient(0deg, #222222, #222222),linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
        }}
        className="text-sm py-1 rounded-full flex justify-center items-center"
        onClick={() => {
          setGlobalState("stepCount", 1);
        }}
      >
        Back{" "}
      </div>
    </div>
  );
}

export default Step;
