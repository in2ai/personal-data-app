import "expo-dev-client";
import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import tw from "twrnc";
import {
  checkRelayConnection,
  getEventsFromRelay,
  publishEventToRelay,
  signEvent,
} from "../api/nostr";

const RelayTestScreen = ({ navigation, route }) => {
  const secretKey = route.params.secretKey;
  const publicKey = route.params.publicKey;
  const [relay, setRelay] = useState(false);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("ws://137.184.117.201:8008");

  const checkRelay = async () => {
    try {
      await checkRelayConnection(url);
      setRelay(true);
    } catch (e) {
      alert("Could not connect to relay");
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
      setMessage("");
      alert("Message sent");
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
    <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg`}>Relay Test</Text>
        <Text style={tw`text-sm`}>Your secret key is: {secretKey}</Text>
        <Text style={tw`text-sm`}>Your public key is: {publicKey}</Text>
        <TextInput
          style={tw`mt-8 border border-black rounded-md p-2`}
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
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg`}>Connected to relay: {url}</Text>
          <TextInput
            style={tw`mt-8 border border-black rounded-md p-2`}
            onChangeText={setMessage}
            value={message}
          />
          <Button
            disabled={message === ""}
            title="Public Message"
            onPress={handlePublicMessage}
          />
          <Button title="Get My Messages" onPress={getMyMessages} />
        </View>
      )}
      <View style={tw`mb-4`}>
        <Button
          title="Go to CV Test"
          onPress={() => navigation.navigate("CvTest")}
        />
      </View>
    </View>
  );
};

export default RelayTestScreen;
