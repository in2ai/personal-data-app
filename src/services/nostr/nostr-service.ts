import 'fast-text-encoding'; // this is needed to polyfill TextDecoder which nostr-tools uses
import 'react-native-get-random-values'; // this is needed to polyfill crypto.getRandomValues which nostr-tools uses
import 'react-native-webview-crypto'; // this is needed to polyfill crypto.subtle which nostr-tools uses
import 'react-native-url-polyfill/auto'; // this is needed to polyfill URLSearchParams which nostr-tools uses
import 'websocket-polyfill'; // this is needed to polyfill WebSocket which nostr-tools uses

import { generatePrivateKey, getPublicKey } from 'nostr-tools';

type KeyPair = {
  secretKey: string;
  publicKey: string;
};

const generateKeyPair = (): KeyPair => {
  const sk = generatePrivateKey();
  const pk = getPublicKey(sk);
  return { secretKey: sk, publicKey: pk };
};

const getPublicKeyFromPrivate = (privateKey): string => {
  const publicKey = getPublicKey(privateKey);
  return publicKey;
};

const nostrService = {
  generateKeyPair,
  getPublicKeyFromPrivate,
};

export default nostrService;
