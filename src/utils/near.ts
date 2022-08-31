import * as nearAPI from "near-api-js";
import { Buffer } from 'buffer';
window.Buffer = Buffer
const { connect, keyStores, WalletConnection } = nearAPI;

interface Contracts {
  top_contract_id: string,
  nft_contract_id: string,
  market_contract_id: string
}

const connectionConfig = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

let backendContracts: Contracts;

export const initializeBackend = async () => {
  const response = await fetch('/api?url=/rest/contracts');
  backendContracts = await response.json();
}

const nearConnection = await connect(connectionConfig);
export const wallet = new WalletConnection(nearConnection, 'Battlemon');


export const signIn = async () => {
  await wallet.requestSignIn({
    contractId: backendContracts.nft_contract_id
  });
}