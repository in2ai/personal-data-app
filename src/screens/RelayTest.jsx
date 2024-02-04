import "expo-dev-client";
import "react-native-url-polyfill/auto"; // this is needed to polyfill URLSearchParams which nostr-tools uses
import "websocket-polyfill"; // this is needed to polyfill WebSocket which nostr-tools uses

import { Relay, finalizeEvent, verifyEvent } from "nostr-tools";
import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import tw from "twrnc";

const RelayTestScreen = ({ navigation, route }) => {
  const secretKey = route.params.secretKey;
  const publicKey = route.params.publicKey;
  const [relay, setRelay] = useState(null);
  const [url, setUrl] = useState("ws://137.184.117.201:8008");

  const connectRelay = async () => {
    try {
      const relay = await Relay.connect(url);
      console.log("relay connected: ", relay.url);
      setRelay(relay);
    } catch (e) {
      console.log("relay connection failed: ", e);
    }
  };

  const getEvents = () => {
    // let's query for an event that exists
    const sub = relay.subscribe(
      [
        {
          kinds: [1],
          authors: [publicKey],
        },
      ],
      {
        onevent(event) {
          console.log("we got the event we wanted:", event);
        },
        oneose() {
          sub.close();
        },
      }
    );
  };

  return (
    <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg`}>Relay Test</Text>
        <Text style={tw`text-sm`}>Your secret key is: {secretKey}</Text>
        <Text style={tw`text-sm`}>Your public key is: {publicKey}</Text>
        <TextInput
          style={tw`border border-black rounded-md p-2`}
          onChangeText={setUrl}
          value={url}
        />
        <Button title="Connect to Relay" onPress={connectRelay} />
      </View>
      {relay && (
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg`}>Connected to relay: {relay.url}</Text>
          <Button title="Get Events" onPress={getEvents} />
          <Button
            title="Post Event"
            onPress={async () => {
              try {
                console.log("publishing event...");
                let eventTemplate = {
                  kind: 1,
                  created_at: Math.floor(Date.now() / 1000),
                  tags: [],
                  content: "hello world",
                };
                const signedEvent = finalizeEvent(eventTemplate, secretKey);
                let isGood = verifyEvent(signedEvent);
                console.log("isGood: ", isGood);
                await relay.publish(signedEvent);
                console.log("published event: ", signedEvent);
              } catch (e) {
                console.log("failed to publish event: ", e);
              }
            }}
          />
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
