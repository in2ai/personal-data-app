import "expo-dev-client";
import "fast-text-encoding"; // this is needed to polyfill TextDecoder which nostr-tools uses
import "react-native-get-random-values"; // this is needed to polyfill crypto.getRandomValues which nostr-tools uses
import "react-native-webview-crypto"; // this is needed to polyfill crypto.subtle which nostr-tools uses

import { View, Text, Button } from "react-native";
import tw from "twrnc";
import { useState } from "react";
//import { generatePrivateKey } from "nostr-tools";
import { generateSecretKey, getPublicKey } from "nostr-tools";

const AuthScreen = ({ navigation }) => {
  const [secretKey, setSecretKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  return (
    <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
      <Button
        title="Create Secret Key"
        onPress={() => {
          const sk = generateSecretKey();
          const pk = getPublicKey(sk);
          setSecretKey(sk);
          setPublicKey(pk);
        }}
      />
      <Text style={tw`text-sm`}>Your secret key is: {secretKey}</Text>
      <Text style={tw`text-sm`}>Your public key is: {publicKey}</Text>
    </View>
  );
};

export default AuthScreen;
