import dotenv from "dotenv";
import { ethers } from "ethers";
import {
  DigitalIdentity,
  DigitalIdentity__factory,
  HelloWorld__factory,
} from "../../blockchain/typechain-types";

dotenv.config();

export const getHelloWorldContract = (
  environment: "local" | "testnet" = "local"
) => {
  const url =
    environment === "local" ? process.env.LOCAL_URL : process.env.TESTNET_URL;

  const provider = new ethers.providers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.HELLO_WORLD_CONTRACT_ADDRESS!,
    HelloWorld__factory.abi,
    wallet
  );
};

export const getDigitalIdentityContract = (
  environment: "local" | "testnet" = "local"
): DigitalIdentity => {
  const url =
    environment === "local" ? process.env.LOCAL_URL : process.env.TESTNET_URL;

  const provider = new ethers.providers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.DI_CONTRACT_ADDRESS!,
    DigitalIdentity__factory.abi,
    wallet
  ) as any;
};
