import "expo-dev-client";
import "react-native-url-polyfill/auto"; // this is needed to polyfill URLSearchParams which nostr-tools uses
import { Relay } from "nostr-tools";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const RelayTestScreen = ({ navigation, route }) => {
  const secretKey = route.params.secretKey;
  const publicKey = route.params.publicKey;
  const [relay, setRelay] = useState(null);

  const connectRelay = async () => {
    try {
      const relay = await Relay.connect("wss://relay.damus.io");
      console.log("relay connected: ", relay.url);
      setRelay(relay);
    } catch (e) {
      console.log("relay connection failed: ", e);
    }
  };

  useEffect(() => {
    connectRelay();
  }, []);

  const getEvents = () => {
    // let's query for an event that exists
    const sub = relay.subscribe(
      [
        {
          limit: 1,
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

  useEffect(() => {
    if (relay) {
      getEvents();
    }
  }, [relay]);

  return (
    <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg`}>Relay Test</Text>
        <Text style={tw`text-sm`}>Your secret key is: {secretKey}</Text>
        <Text style={tw`text-sm`}>Your public key is: {publicKey}</Text>
      </View>
      {relay && (
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg`}>Connected to relay: {relay.url}</Text>
        </View>
      )}
    </View>
  );
};

export default RelayTestScreen;
