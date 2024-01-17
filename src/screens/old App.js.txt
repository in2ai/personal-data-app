import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { linkedinToDatabase } from "./src/utils/linkedin";
import { europassToDatabase } from "./src/utils/europass";
import { printDatabase } from "./src/utils/print";
import { createTablesIfNotExists } from "./src/api/db";

export default function App() {
  createTablesIfNotExists();

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
        </View>
        <View style={styles.section}>
          <Text>Database</Text>
          <Button title="Print DB" onPress={() => printDatabase()} />
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
