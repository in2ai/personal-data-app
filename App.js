import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import {
  linkedinToDatabase,
  printLinkedinDatabase,
} from "./src/utils/linkedin";

export default function App() {
  const onZipFileSelected = async (result) => {
    if (result) {
      const uri = result.assets[0].uri;
      await linkedinToDatabase(uri);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>Personal Data App</Text>
        <Button
          title="Load Linkedin ZIP"
          onPress={async () => {
            const result = await DocumentPicker.getDocumentAsync({
              type: "application/zip",
              copyToCacheDirectory: true,
            });
            onZipFileSelected(result);
          }}
        />
        <Button
          title="Check Linkedin DB"
          onPress={() => printLinkedinDatabase()}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
