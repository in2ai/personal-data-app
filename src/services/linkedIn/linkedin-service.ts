import * as FileSystem from 'expo-file-system';
import { unzip } from 'react-native-zip-archive';
import Papa from 'papaparse';
import { LinkedinUserData } from './LinkedInUserData';

export const getUserFromLinkedInZip = async (fileUri: string): Promise<LinkedinUserData> => {
  try {
    const test = await unzip(fileUri, FileSystem.documentDirectory);
    const documents = ['Profile', 'Positions', 'Skills'];

    const data: LinkedinUserData = new LinkedinUserData();
    for (const document of documents) {
      const fileUri = FileSystem.documentDirectory + document + '.csv';

      await FileSystem.readAsStringAsync(fileUri)
        .then((fileContent) => {
          const parsedCsv = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
          });

          data[document] = parsedCsv.data;
        })
        .catch((error) => {
          console.log('//No data for: ', document);
        });
    }

    return data;
  } catch (error) {
    console.log('Error getting user from LinkedIn zip', error);
  }
};
