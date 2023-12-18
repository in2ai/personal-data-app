import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { unzip } from "react-native-zip-archive";

export default function App() {
  const onZipFileSelected = async (result) => {
    if (result) {
      const uri = result.assets[0].uri;
      console.log("uri", uri);
      //unzip
      const unzipped = await unzip(uri, FileSystem.documentDirectory);
      console.log("unzipped", unzipped);

      //read file
      const fileUri = FileSystem.documentDirectory + "Profile.csv";
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      console.log("fileContent", fileContent);
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
