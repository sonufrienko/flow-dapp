// @ts-ignore
import { config } from '@onflow/fcl';

config({
  'accessNode.api': process.env.NEXT_PUBLIC_ACCESS_NODE,
  'discovery.wallet': process.env.NEXT_PUBLIC_WALLET_DISCOVERY,
});
