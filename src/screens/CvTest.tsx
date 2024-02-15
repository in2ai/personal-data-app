import 'expo-dev-client';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createTablesIfNotExists, getPerson } from '../api/db';
import { europassToDatabase } from '../api/europass';
import { linkedinToDatabase } from '../api/linkedin';
import { getEventsFromRelay, publishEventToRelay, signEvent } from '../api/nostr';
import { printDatabase } from '../api/print';
import { useAuthContext } from '../context-providers/auth-context';

const RELAY_URL = 'ws://137.184.117.201:8008';

export default function CvTestScreen({ navigation, route }) {
  const { publicKey, secretKey } = useAuthContext();

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
    try {
      const workOffer = {
        title: 'Oferta de trabajo',
        summary: 'Oferta de trabajo de prueba',
        requiredSkills: ['React', 'Node.js', 'MongoDB'],
        location: 'Madrid',
        price: 50000,
        currency: 'EUR',
        period: 'year',
      };
      const workOfferString = JSON.stringify(workOffer);

      const eventTemplate = {
        kind: 30023,
        tags: [],
        content: workOfferString,
        created_at: Math.floor(Date.now() / 1000),
      };
      const signedEvent = signEvent(eventTemplate, secretKey);
      await publishEventToRelay(RELAY_URL, signedEvent);
      alert('Offer inserted');
    } catch (e) {
      alert(e.message);
    }
  };

  const getOffers = async () => {
    const events = await getEventsFromRelay(RELAY_URL, {
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
    const offers = await getEventsFromRelay(RELAY_URL, {
      kinds: [30023],
      limit: 1,
    });

    const offer = JSON.parse(offers[0].content);
    let match = false;
    offer.requiredSkills.forEach((skill) => {
      if (person.skills.find((s) => s.value === skill)) match = true;
    });

    if (match) alert('Match with offer ' + offer.title + '!');
    else alert('No match');
  };

  return (
    <SafeAreaProvider>
      <View className="my-4 flex items-center">
        <Text className="text-lg">CV Test</Text>
        <Button
          title="Load Linkedin ZIP"
          onPress={async () => {
            const result = await DocumentPicker.getDocumentAsync({
              type: 'application/zip',
              copyToCacheDirectory: true,
            });
            onLinkedinZipFileSelected(result);
          }}
        />
        <Button
          title="Load Europass PDF"
          onPress={async () => {
            const result = await DocumentPicker.getDocumentAsync({
              type: 'application/pdf',
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
      <View className="my-4 flex items-center">
        <Text className="text-lg">Offers</Text>
        <Button title="Insert example offer" onPress={insertOffer} />
        <Button title="Get offers" onPress={getOffers} />
      </View>
      {personId && (
        <View className="my-4 flex items-center">
          <Text className="text-lg">Match</Text>
          <Button title="My info" onPress={myInfo} />
          <Button title="Match" onPress={match} />
        </View>
      )}
    </SafeAreaProvider>
  );
}
