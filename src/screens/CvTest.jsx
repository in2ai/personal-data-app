import "expo-dev-client";
import { Button, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { createTablesIfNotExists, getPerson } from "../api/db";
import { linkedinToDatabase } from "../api/linkedin";
import { europassToDatabase } from "../api/europass";
import { printDatabase } from "../api/print";
import tw from "twrnc";
import {
  getEventsFromRelay,
  publishEventToRelay,
  signEvent,
} from "../api/nostr";
import { useState } from "react";  

import { matchCVOffer } from "../api/dl";

export default function CvTestScreen({ navigation, route }) {
  const secretKey = route.params.secretKey;
  const publicKey = route.params.publicKey;
  const url = route.params.url;
  const [personId, setPersonId] = useState(null);

  createTablesIfNotExists();

  const onLinkedinZipFileSelected = async (result) => {
    if (result) {
      const uri = result.assets[0].uri;
      const id_person = await linkedinToDatabase(uri);
      if (id_person) {
        alert(`Linkedin data imported for person with id ${id_person}`);
        setPersonId(id_person);
      }
    }
  };

  const onEuropassPdfFileSelected = async (result) => {
    if (result) {
      const uri = result.assets[0].uri;
      await europassToDatabase(uri);
    }
  };

  const insertOffer = async () => {
    console.log("hola")
    try {
      const workOffer = {
        title: "Oferta de trabajo",
        summary: "Oferta de trabajo de prueba",
        requiredSkills: ["React", "Node.js", "MongoDB"],
        location: "Madrid",
        price: 50000,
        currency: "EUR",
        period: "year",
      };
      const workOfferString = JSON.stringify(workOffer);

      const eventTemplate = {
        kind: 30023,
        tags: [],
        content: workOfferString,
        created_at: Math.floor(Date.now() / 1000),
      };
      const signedEvent = signEvent(eventTemplate, secretKey);
      await publishEventToRelay(url, signedEvent);
      alert("Offer inserted");
    } catch (e) {
      console.log(e)
      alert(e.message);
    }
  };

  const getOffers = async () => {
    const events = await getEventsFromRelay(url, {
      kinds: [30023],
      limit: 10,
    });
    alert(JSON.stringify(events, null, 2));
  };

  const myInfo = async () => {
    const person = await getPerson(personId);
    alert(JSON.stringify(person, null, 2));
  };

  const match = async () => {
    const person = await getPerson(personId);
    const offers = await getEventsFromRelay(url, {
      kinds: [30023],
      limit: 1,
    });
    // const offer = JSON.parse(offers[0].content);

    // const person_string = jsonToSpaceDelimitedText(person);
    // const offer_string = jsonToSpaceDelimitedText(offer);

    const person_string = "tengo conocimiento en python y web";
    const offer_string = "buscamos gente que tenga conocimiento en python y desarrollo web";

    console.log("person",person_string);
    console.log(offer_string);

    // De momento el modelo se carga al pulsar el boton, habria que cambiarlo para que este cargado
    const match = await matchCVOffer(person_string,offer_string)

    alert("Match with offer " + match.toString() + "%")
  };

  return (
    <SafeAreaProvider>
      <View style={tw`flex items-center my-4`}>
        <Text style={tw`text-lg`}>CV Test</Text>
        <Button
          title="Load Linkedin ZIP"
          onPress={async () => {
            const result = await DocumentPicker.getDocumentAsync({
              type: "application/zip",
              copyToCacheDirectory: true,
            });
            onLinkedinZipFileSelected(result);
          }}
        />
        <Button
          title="Load Europass PDF"
          onPress={async () => {
            const result = await DocumentPicker.getDocumentAsync({
              type: "application/pdf",
              copyToCacheDirectory: true,
            });
            onEuropassPdfFileSelected(result);
          }}
        />
        <Button
          title="Check DB"
          onPress={async () => {
            const result = await printDatabase();
            const rows = result.rows;
            alert(JSON.stringify(rows, null, 2));
          }}
        />
      </View>
      <View style={tw`flex items-center my-4`}>
        <Text style={tw`text-lg`}>Offers</Text>
        <Button title="Insert example offer" onPress={insertOffer} />
        <Button title="Get offers" onPress={getOffers} />
      </View>
      {personId && (
        <View style={tw`flex items-center my-4`}>
          <Text style={tw`text-lg`}>Match</Text>
          <Button title="My info" onPress={myInfo} />
          <Button title="Match" onPress={match} />
        </View>
      )}
    </SafeAreaProvider>
  );
}
