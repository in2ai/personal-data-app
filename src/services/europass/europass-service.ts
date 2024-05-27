import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import convert from 'xml-js';

export const getEuropassUserFromPdfFile = async (fileUri: string): Promise<any> => {
  try {
    //read file as base 64
    const fileContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    //base 64 decode
    const decodedFileContent = Buffer.from(fileContent, 'base64').toString('utf-8');

    //keep only xml (from '<?xml version' to 'endstream')
    const start = decodedFileContent.indexOf('<?xml version');
    if (start === -1) throw new Error('Invalid Europass file');
    const end = decodedFileContent.indexOf('endstream', start);
    if (end === -1) throw new Error('Invalid Europass file');

    //xml to json
    const xml = decodedFileContent.substring(start, end);
    const euroPassUser = JSON.parse(JSON.stringify(convert.xml2js(xml, { compact: true })));

    return euroPassUser;
  } catch (error) {
    console.log('Error getting user from Europass PDF', error);
  }
};
