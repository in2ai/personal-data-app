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
  const i2hex = (i) => {
    return ("0" + i.toString(16)).slice(-2);
  };
  return (
    <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
      <View style={tw`mb-4`}>
        <Button
          title="Create Secret Key"
          onPress={() => {
            let sk = generateSecretKey();
            const pk = getPublicKey(sk);
            //sk is Uint8Array, so we need to convert it to hex string
            sk = Array.from(sk).map(i2hex).join("");
            setSecretKey(sk);
            setPublicKey(pk);
          }}
        />
        <Text style={tw`text-sm`}>Your secret key is: {secretKey}</Text>
        <Text style={tw`text-sm`}>Your public key is: {publicKey}</Text>
      </View>
      {secretKey !== "" && publicKey !== "" && (
        <View style={tw`mb-4`}>
          <Button
            title="Go to Relay Test"
            onPress={() =>
              navigation.navigate("RelayTest", { secretKey, publicKey })
            }
          />
        </View>
      )}
    </View>
  );
};

export default AuthScreen;
