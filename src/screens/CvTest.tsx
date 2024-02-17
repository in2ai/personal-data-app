import 'expo-dev-client';
import { Button, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { createTablesIfNotExists, getPerson } from '../api/db';
import { linkedinToDatabase } from '../api/linkedin';
import { europassToDatabase } from '../api/europass';
import { printDatabase } from '../api/print';
import { getEventsFromRelay, publishEventToRelay, signEvent } from '../api/nostr';
import React, { useState, useEffect } from 'react';

import { matchCVOffer, initTfjs, load_model, jsonToSpaceDelimitedText } from '../api/dl';
import { useAuthContext } from '../context-providers/auth-context';

const RELAY_URL = 'ws://137.184.117.201:8008';

export default function CvTestScreen({ navigation, route }) {
  const { publicKey, secretKey } = useAuthContext();

  const [personId, setPersonId] = useState(null);

  const [model, setModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    async function initAndLoadModel() {
      await initTfjs();
      console.log('//INIT DONE');
      const loadedModel = await load_model(); // Cargar el modelo
      setModel(loadedModel);
      setModelLoading(false); // Actualizar el estado para reflejar que la carga del modelo ha terminado
    }
    initAndLoadModel();
  }, []);

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
    console.log('hola');
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
      console.log(e);
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
    if (modelLoading) {
      alert('El modelo aún se está cargando. Por favor, espera.');
      return;
    }

    const person = await getPerson(personId);
    const offers = await getEventsFromRelay(RELAY_URL, {
      kinds: [30023],
      limit: 1,
    });
    const offer = JSON.parse(offers[0].content);

    const person_string = jsonToSpaceDelimitedText(person);
    const offer_string = jsonToSpaceDelimitedText(offer);

    // const person_string = "tengo conocimiento en python y web";
    // const offer_string = "buscamos gente que tenga conocimiento en python y desarrollo web";

    console.log('person', person_string);
    console.log(offer_string);

    const match = await matchCVOffer(person_string, offer_string, model);

    alert('Match with offer ' + match.toString() + '%');
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
