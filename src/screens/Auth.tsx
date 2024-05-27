import 'fast-text-encoding'; // this is needed to polyfill TextDecoder which nostr-tools uses
import 'react-native-get-random-values'; // this is needed to polyfill crypto.getRandomValues which nostr-tools uses
import 'react-native-webview-crypto'; // this is needed to polyfill crypto.subtle which nostr-tools uses
import 'react-native-url-polyfill/auto'; // this is needed to polyfill URLSearchParams which nostr-tools uses
import 'websocket-polyfill'; // this is needed to polyfill WebSocket which nostr-tools uses

import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

import nostrService from '../services/nostr/nostr-service';
import { RootStackParamList } from '../navigation/MainNav';

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [inputKey, setInputKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const handleInputKey = () => {
    try {
      if (inputKey.length !== 64) {
        alert('Secret key must be 64 bytes long');
        return;
      }
      const pk = nostrService.getPublicKeyFromPrivate(inputKey);
      setPublicKey(pk);
      setSecretKey(inputKey);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleNewKey = () => {
    try {
      const keyPair = nostrService.generateKeyPair();
      console.log(keyPair);
      setSecretKey(keyPair.secretKey);
      setPublicKey(keyPair.publicKey);
    } catch (e) {
      alert(e.message);
    }
  };

  const onPressRelayTest = () => {
    navigation.navigate('RelayTest', { secretKey, publicKey });
  };

  return (
    <View className="bg-white p-4 pt-2">
      <View className="mb-4">
        <Text className="text-lg">Enter your secret key:</Text>
        <TextInput
          className="rounded-md border border-black p-2"
          onChangeText={setInputKey}
          value={inputKey}
        />
        <Button title="Submit" onPress={handleInputKey} />
        <Text className="mt-4 text-lg">Or generate a new one:</Text>
        <Button title="Create Secret Key" onPress={handleNewKey} />
        <Text className="text-sm">Your secret key is: {secretKey}</Text>
        <Text className="text-sm">Your public key is: {publicKey}</Text>
      </View>
      {secretKey !== '' && publicKey !== '' && (
        <View className="mb-4">
          <Button title="Relay Connection" onPress={onPressRelayTest} />
        </View>
      )}
    </View>
  );
};

export default AuthScreen;
