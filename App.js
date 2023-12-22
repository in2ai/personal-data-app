import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import {
  linkedinToDatabase,
  printLinkedinDatabase,
} from "./src/utils/linkedin";
import {
  europassToDatabase,
  printEuropassDatabase,
} from "./src/utils/europass";

export default function App() {
  const onLinkedinZipFileSelected = async (result) => {
    if (result) {
      const uri = result.assets[0].uri;
      await linkedinToDatabase(uri);
    }
  };

  const onEuropassPdfFileSelected = async (result) => {
    if (result) {
      const uri = result.assets[0].uri;
      await europassToDatabase(uri);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text>Linkedin</Text>
          <Button
            title="Load ZIP"
            onPress={async () => {
              const result = await DocumentPicker.getDocumentAsync({
                type: "application/zip",
                copyToCacheDirectory: true,
              });
              onLinkedinZipFileSelected(result);
            }}
          />
          <Button
            title="Print DB: linkedin table"
            onPress={() => printLinkedinDatabase()}
          />
        </View>
        <View style={styles.section}>
          <Text>Europass</Text>
          <Button
            title="Load PDF"
            onPress={async () => {
              const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
                copyToCacheDirectory: true,
              });
              onEuropassPdfFileSelected(result);
            }}
          />
          <Button
            title="Print DB: europass table"
            onPress={() => printEuropassDatabase()}
          />
        </View>
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
  section: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
