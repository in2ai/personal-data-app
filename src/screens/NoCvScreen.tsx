import 'expo-dev-client';
import React from 'react';

import { Text, View } from 'react-native';
import CustomButton from '../components/smart/CustomButton';

type NoCvScreenProps = {
  onStartAssistant?: () => void;
};

const NoCvScreen: React.FC<NoCvScreenProps> = ({ onStartAssistant }) => {
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
        <CustomButton title="LinkedIn (archivo .zip)" />
        <CustomButton title="Europass (archivo .pdf o .xml)" />
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
