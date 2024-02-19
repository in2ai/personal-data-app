import 'expo-dev-client';
import * as DocumentPicker from 'expo-document-picker';
import React from 'react';

import { Text, View } from 'react-native';
import CustomButton from '../components/smart/CustomButton';
import { getUserFromLinkedInZip } from '../services/linkedIn/linkedin-service';
import { UserData } from '../models/userData';
import { getEuropassUserFromPdfFile } from '../services/europass/europass-service';
import { EuropassUserData } from '../services/europass/EuropassUserData';
import { mapper } from '../mappers/mapper';
import { LinkedinUserData } from '../services/linkedIn/LinkedInUserData';

type NoCvScreenProps = {
  onStartAssistant?: () => void;
  onImportedUserCv?: (userData: UserData) => void;
};

const NoCvScreen: React.FC<NoCvScreenProps> = ({ onStartAssistant, onImportedUserCv }) => {
  // LinkedIn
  const onLinkedinZipFileSelected = async () => {
    DocumentPicker.getDocumentAsync({
      type: 'application/zip',
      copyToCacheDirectory: true,
    })
      .then((result) => recoverDataFromLinkedInZip(result))
      .catch((err) => console.log('//Not file recovered'));
  };

  const recoverDataFromLinkedInZip = async (
    documentPickerResult: DocumentPicker.DocumentPickerResult
  ) => {
    if (!documentPickerResult) return;

    const uri = documentPickerResult.assets[0].uri;
    const linkedinUserData = await getUserFromLinkedInZip(uri);

    const userData = mapper.map(linkedinUserData, LinkedinUserData, UserData);
    onImportedUserCv && onImportedUserCv(userData);
  };

  // Europass
  const onEuropassFileSelected = async () => {
    DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    })
      .then((result) => recoverDataFromEuropassPdf(result))
      .catch((err) => console.log('//Not file recovered'));
  };

  const recoverDataFromEuropassPdf = async (
    documentPickerResult: DocumentPicker.DocumentPickerResult
  ) => {
    if (!documentPickerResult) return;

    const uri = documentPickerResult.assets[0].uri;
    const europassUserData = await getEuropassUserFromPdfFile(uri);

    const userData = mapper.map(europassUserData, EuropassUserData, UserData);
    onImportedUserCv && onImportedUserCv(userData);
  };

  return (
    <View className="p-5">
      <View className="w-full pb-5">
        <Text className="text-xl text-h1Color">Crear CV</Text>
      </View>
      <View className="w-full pb-5">
        <Text className="text-md text-defaultTextColor">
          Vemos que todavía no has introducido tu CV. Este paso es importante para poder buscar las
          ofertas más adecuadas a tu perfil y te permitirá poder aplicar a ellas.
        </Text>
      </View>
      <View className="w-full pb-5">
        <View className="pb-3">
          <Text className="text-lg text-h1Color">Importa tu CV</Text>
          <Text className="text-md text-defaultTextColor">
            Puedes importar tu CV desde tu perfil de LinkedIn o desde tu Europass.
          </Text>
        </View>
        <CustomButton title="LinkedIn (archivo .zip)" onPress={onLinkedinZipFileSelected} />
        <CustomButton title="Europass (archivo .pdf o .xml)" onPress={onEuropassFileSelected} />
      </View>
      <View className="w-full pb-5">
        <View className="pb-3">
          <Text className="text-lg text-h1Color">O introdúcelo manualmente</Text>
          <Text className="text-md text-defaultTextColor">
            Déjate guiar por nuestro asistente y rellena tu CV manualmente en unos poso pasos.
          </Text>
        </View>
        <CustomButton title="Seguir nuestro asistente" onPress={onStartAssistant} />
      </View>
    </View>
  );
};

export default NoCvScreen;
