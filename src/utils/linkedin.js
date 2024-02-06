import * as FileSystem from "expo-file-system";
import { unzip } from "react-native-zip-archive";
import Papa from "papaparse";
import { connectDatabase } from "../api/db";
export { linkedinToDatabase };

const linkedinToDatabase = async (uri) => {
  try {
    await unzip(uri, FileSystem.documentDirectory);
    const fileUri = FileSystem.documentDirectory + "Profile.csv";
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    const parsedCsv = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    const data = parsedCsv.data[0];
    const db = await connectDatabase();
    const query = {
      sql: "insert into person (name, surname, about_me, birth_date, mother_tongue) values (?, ?, ?, ?, ?)",
      args: [
        data["First Name"],
        data["Last Name"],
        data["Summary"],
        data["Birth Date"],
        data["Mother Tongue"],
      ],
    };
    const [result] = await db.execAsync([query], false);
    const id_person = result.insertId;
    return id_person;
  } catch (error) {
    console.error(error);
    return null;
  }
};
