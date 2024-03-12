import "fast-text-encoding"; // this is needed to polyfill TextDecoder which nostr-tools uses
import "react-native-get-random-values"; // this is needed to polyfill crypto.getRandomValues which nostr-tools uses
import "react-native-webview-crypto"; // this is needed to polyfill crypto.subtle which nostr-tools uses
import "react-native-url-polyfill/auto"; // this is needed to polyfill URLSearchParams which nostr-tools uses
import "websocket-polyfill"; // this is needed to polyfill WebSocket which nostr-tools uses
import {
  generatePrivateKey,
  getPublicKey,
  relayInit,
  Filter,
  Event,
  EventTemplate,
  finishEvent,
} from "nostr-tools";

export interface KeyPair {
  secretKey: string;
  publicKey: string;
}

export const generateKeyPair = (): KeyPair => {
  const sk = generatePrivateKey();
  const pk = getPublicKey(sk);
  return { secretKey: sk, publicKey: pk };
};

export const getPublicKeyFromPrivate = (privateKey): string => {
  const publicKey = getPublicKey(privateKey);
  return publicKey;
};

export const checkRelayConnection = async (url: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const relay = relayInit(url);
    relay.on("connect", () => {
      resolve(true);
      relay.close();
    });
    relay.on("error", () => {
      relay.close();
      reject(false);
    });
    relay.connect();
  });
};

export const getEventsFromRelay = (
  relayUri: string,
  filter: Filter
): Promise<Event[] | null> => {
  return new Promise((resolve, reject) => {
    const relay = relayInit(relayUri);
    relay.on("connect", async () => {
      const event = await relay.list([filter]);
      relay.close();
      resolve(event);
    });
    relay.on("error", () => {
      relay.close();
      reject(new Error(`failed to connect to ${relay.url}`));
    });

    relay.connect();
  });
};

export const signEvent = (eventTemplate: EventTemplate, sk: string) => {
  return finishEvent(eventTemplate, sk);
};

export const publishEventToRelay = (
  relayUri: string,
  event: Event
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const relay = relayInit(relayUri);

    relay.on("connect", async () => {
      await relay.publish(event);
      relay.close();
      resolve();
    });
    relay.on("error", () => {
      relay.close();
      reject(new Error(`failed to connect to ${relay.url}`));
    });

    relay.connect();
  });
};
