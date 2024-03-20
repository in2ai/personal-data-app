import 'expo-dev-client';
import { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

import {
  checkRelayConnection,
  getEventsFromRelay,
  publishEventToRelay,
  signEvent,
} from '../api/.unused/nostr';
import { useAuthContext } from '../context-providers/auth-context';
import CustomButton from '../components/smart/CustomButton';

const RelayTestScreen = ({ navigation, route }) => {
  const { publicKey, secretKey, logout } = useAuthContext();

  const [relay, setRelay] = useState(false);
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('ws://137.184.117.201:8008');

  const checkRelay = async () => {
    try {
      await checkRelayConnection(url);
      setRelay(true);
    } catch (e) {
      alert('Could not connect to relay');
    }
  };

  const handlePublicMessage = async () => {
    try {
      const eventTemplate = {
        kind: 1,
        tags: [],
        content: message,
        created_at: Math.floor(Date.now() / 1000),
      };
      const signedEvent = signEvent(eventTemplate, secretKey);
      await publishEventToRelay(url, signedEvent);
      setMessage('');
      alert('Message sent');
    } catch (e) {
      alert(e.message);
    }
  };

  const getMyMessages = async () => {
    const events = await getEventsFromRelay(url, {
      kinds: [1],
      authors: [publicKey],
      limit: 10,
    });
    alert(JSON.stringify(events, null, 2));
  };

  return (
    <View className="bg-white p-4 pt-2">
      <View className="mb-4">
        <Text className="text-lg">Relay Test</Text>
        <Text className="text-sm">Your secret key is: {secretKey}</Text>
        <Text className="text-sm">Your public key is: {publicKey}</Text>
        <TextInput
          className="mt-8 rounded-md border border-black p-2"
          onChangeText={setUrl}
          value={url}
        />
        {relay ? (
          <Button title="Change Relay" onPress={() => setRelay(false)} />
        ) : (
          <Button title="Check conneciton" onPress={checkRelay} />
        )}
      </View>
      {relay && (
        <View className="mb-4">
          <Text className="text-lg">Connected to relay: {url}</Text>
          <TextInput
            className="mt-8 rounded-md border border-black p-2"
            onChangeText={setMessage}
            value={message}
          />
          <Button disabled={message === ''} title="Public Message" onPress={handlePublicMessage} />
          <Button title="Get My Messages" onPress={getMyMessages} />
        </View>
      )}
      <View className="mb-4">
        <Button
          title="Go to CV Test"
          onPress={() => navigation.navigate('CvTest', { url, secretKey, publicKey })}
        />
      </View>

      <View className="w-full">
        <CustomButton buttonType="primary" title="Logout" hasLargeFont={true} onPress={logout} />
      </View>
    </View>
  );
};

export default RelayTestScreen;
