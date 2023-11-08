"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import {
  handleContributorModal,
  handleLoginModal,
  setActiveWallet,
} from "@/redux/slice/modalSlice";
import { setSignature } from "@/redux/slice/walletSlice";
import { ArrowUpRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAccount, useConnect, useSignMessage } from "wagmi";

const DefaultButton = ({ variant, label, icon, style, color, onClick }) => {
  return (
    <Button
      variant={variant}
      color={color}
      className={`items-center gap-3 px-4 py-2 font-grotesque text-base font-normal capitalize sm:text-lg md:text-xl ${
        style ? style : "flex"
      }`}
      onClick={onClick}
    >
      {label}
      {icon ? icon : <ArrowUpRightIcon className="h-5 w-5" />}
    </Button>
  );
};

const DefaultWhiteButton = ({ label, style, onClick }) => {
  return (
    <Button
      variant="filled"
      color="white"
      className={`flex items-center rounded-full bg-white px-8 py-2 font-grotesque text-base font-semibold capitalize sm:text-lg md:text-xl ${
        style ? style : ""
      }`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

const TlBankLoginBtn = () => {
  const dispatch = useDispatch();
  const signature = useSelector((state) => state.wallet.signature);
  const { isConnected } = useAccount();

  const handleClick = () => {
    dispatch(handleLoginModal());
  };

  return (
    !signature && (
      <Button
        style={{
          background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
        }}
        className="mt-10 flex cursor-pointer rounded-full border-2 border-gray-900 px-20 py-2 text-xl font-bold text-white"
        onClick={handleClick}
      >
        {isConnected ? "Sign Message" : "Login"}
      </Button>
    )
  );
};

const LaunchAppBtn = ({ isDefault, screen, style }) => {
  const router = useRouter();

  const handleClick = () => console.log("clicked");

  return isDefault ? (
    <DefaultButton
      variant="outlined"
      color="white"
      label="Launch App"
      style={screen === "lg" ? "hidden lg:flex" : ""}
      onClick={handleClick}
    />
  ) : (
    <DefaultWhiteButton
      label="Launch App"
      style={style}
      onClick={handleClick}
    />
  );
};

const CreateWalletBtn = ({ isDefault, color, style }) => {
  const router = useRouter();

  const handleClick = () => router.push("/onboard");

  return isDefault ? (
    <DefaultButton
      variant={"filled"}
      color="gray"
      label="Create Wallet"
      style="flex bg-gradient-primary"
      onClick={handleClick}
    />
  ) : (
    <DefaultWhiteButton
      label="Create Wallet"
      style={style}
      onClick={handleClick}
    />
  );
};

const HardwareWalletBtn = () => {
  return (
    <DefaultButton variant="outlined" color="white" label="Hardware Wallet" />
  );
};

const ConnectWalletBtn = () => {
  const activeWallet = useSelector((state) => state.modal.activeWallet);
  const dispatch = useDispatch();
  const handleClick = () => {
    connect({
      connector:
        connectors[
          activeWallet === "MetaMask"
            ? 0
            : activeWallet === "Coinbase Wallet"
            ? 1
            : 2
        ],
    });

    if (activeWallet === "WalletConnect") {
      dispatch(handleLoginModal());
    }
  };
  const { connect, connectors } = useConnect();

  return (
    <DefaultButton
      variant={"filled"}
      color="gray"
      label="Connect Wallet"
      style="flex bg-gradient-primary w-full justify-center text-sm sm:text-sm md:text-base"
      onClick={handleClick}
    />
  );
};

const SignWalletBtn = () => {
  const { data, signMessage } = useSignMessage();
  const dispatch = useDispatch();
  const handleClick = () => {
    signMessage({ message: process.env.NEXT_PUBLIC_AUTH_MESSAGE });
  };

  useEffect(() => {
    if (data) {
      dispatch(handleLoginModal());
      dispatch(setSignature(data));
    }
  }, [data, dispatch]);

  return (
    <DefaultButton
      variant={"filled"}
      color="gray"
      label="Sign In"
      style="flex bg-gradient-primary w-full justify-center text-sm sm:text-sm md:text-base"
      onClick={handleClick}
    />
  );
};

const ContributorModalBtn = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(handleContributorModal());
  };

  return (
    <DefaultButton
      variant={"filled"}
      color="gray"
      label="Add"
      icon={<PlusIcon className="h-5 w-5 text-white" />}
      style="flex bg-gradient-primary"
      onClick={handleClick}
    />
  );
};

const AddContributorBtn = ({ onClick }) => {
  return (
    <DefaultButton
      variant={"filled"}
      color="gray"
      label="Add Contributor"
      icon={<PlusIcon className="h-5 w-5 text-white" />}
      style="flex bg-gradient-primary w-full justify-center text-sm sm:text-sm md:text-base"
      onClick={onClick}
    />
  );
};

export {
  LaunchAppBtn,
  CreateWalletBtn,
  HardwareWalletBtn,
  ConnectWalletBtn,
  SignWalletBtn,
  DefaultButton,
  TlBankLoginBtn,
  ContributorModalBtn,
  AddContributorBtn,
};
