import { HexString } from '@gear-js/api';

interface ContractSails {
  programId: HexString,
  idl: string
}

export const ACCOUNT_ID_LOCAL_STORAGE_KEY = 'account';

export const ADDRESS = {
  NODE: import.meta.env.VITE_NODE_ADDRESS,
  BACK: import.meta.env.VITE_BACKEND_ADDRESS,
  GAME: import.meta.env.VITE_CONTRACT_ADDRESS as HexString,
};

export const ROUTES = {
  HOME: '/',
  EXAMPLES: '/examples',
  NOTFOUND: '*',
};

// To use the example code, enter the details of the account that will pay the vouchers, etc. (name and mnemonic)
// Here, you have an example account that contains tokens, in your dApp, you need to put a sponsor name
// and a sponsor mnemonic
export const sponsorName = 'Alice';
export const sponsorMnemonic = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk';

export const CONTRACT_DATA: ContractSails = {
  programId: '0xeeac910c678b032cbe78ac0d5d8087ce46e2d6689ab1dece9478efd74b2e2bb8',
  idl: `
    type PingEnum = enum {
      Ping,
      Pong,
    };

    constructor {
      New : ();
    };

    service Ping {
      Ping : () -> PingEnum;
      Pong : () -> PingEnum;
      query AllCalls : () -> vec struct { actor_id, PingEnum };
      query LastWhoCall : () -> struct { actor_id, PingEnum };
    };
  `
};