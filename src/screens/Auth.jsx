import "expo-dev-client";
import { View, Text, Button, TextInput } from "react-native";
import tw from "twrnc";
import React, { useState } from "react";
import {
  KeyPair,
  generateKeyPair,
  getPublicKeyFromPrivate,
} from "../api/nostr";

const AuthScreen = ({ navigation }) => {
  const [inputKey, setInputKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const handleInputKey = () => {
    try {
      if (inputKey.length !== 64) {
        alert("Secret key must be 64 bytes long");
        return;
      }
      let pk = getPublicKeyFromPrivate(inputKey);
      setPublicKey(pk);
      setSecretKey(inputKey);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleNewKey = () => {
    try {
      const keyPair = generateKeyPair();
      console.log(keyPair);
      setSecretKey(keyPair.secretKey);
      setPublicKey(keyPair.publicKey);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg`}>Enter your secret key:</Text>
        <TextInput
          style={tw`border border-black rounded-md p-2`}
          onChangeText={setInputKey}
          value={inputKey}
        />
        <Button title="Submit" onPress={handleInputKey} />
        <Text style={tw`text-lg mt-4`}>Or generate a new one:</Text>
        <Button title="Create Secret Key" onPress={handleNewKey} />
        <Text style={tw`text-sm`}>Your secret key is: {secretKey}</Text>
        <Text style={tw`text-sm`}>Your public key is: {publicKey}</Text>
      </View>
      {secretKey !== "" && publicKey !== "" && (
        <View style={tw`mb-4`}>
          <Button
            title="Relay Connection"
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
