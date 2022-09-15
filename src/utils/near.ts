import * as nearAPI from "near-api-js";
import { writable } from "svelte/store";
import swal from 'sweetalert';
import type { 
  Contract as ContractType,
  Near as NearType, 
  WalletConnection as WalletConnectionType
} from "near-api-js";
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI;

interface NftContract extends ContractType {
  nft_tokens_for_owner: (params: any) => any;
  nft_mint_full: (params: any) => any;
}

interface MarketContract  extends ContractType {
  nft_approve: (params: any) => any;
}

interface StoreProps {
  accountId: null | string | undefined
}

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

let contracts: Contracts;
let connection: NearType;
let wallet: WalletConnectionType;
let accountId: string | null = null;
let nftContract: NftContract;
let marketContract: MarketContract;


export const near = writable<StoreProps>({
  accountId: undefined
})

export const nearConnection = async () => {
  const response = await fetch('/api?url=/rest/contracts');
  connection = await connect(connectionConfig);
  contracts = await response.json();
  wallet = new WalletConnection(connection, 'Battlemon');
  await wallet.isSignedInAsync();
  const account = await wallet.account();
  accountId = account?.accountId || null

  nftContract = new Contract(
    account,
    contracts.nft_contract_id,
    {
      viewMethods: ['nft_tokens_for_owner'],
      changeMethods: ['nft_mint_full']
    }
  ) as NftContract

  marketContract = new Contract(
    account,
    contracts.market_contract_id,
    {
      viewMethods: [],
      changeMethods: ['nft_approve']
    }
  ) as MarketContract

  near.set({ accountId })
}


export const signOut = async () => {
  await wallet.signOut();
  accountId = null
  near.set({ accountId })
}

export const signIn = async () => {
  await wallet.requestSignIn({
    contractId: contracts.nft_contract_id
  });
}


export const nftTokensForOwner = async (accountId: string) => {
  return await nftContract.nft_tokens_for_owner({
    account_id: accountId
  });
}

export const nftMintFull = async () => {
  if (!accountId) {
    swal({
      title: "Please, Sign In",
      buttons: ["OK", false]
    })
    document.body.style.cursor = 'default';
    return
  }
  return await nftContract.nft_mint_full({
    args: { receiver_id: accountId },
    amount: utils.format.parseNearAmount("0.1"),
    gas: "150000000000000"
  });
}