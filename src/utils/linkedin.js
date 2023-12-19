import * as FileSystem from "expo-file-system";
import { unzip } from "react-native-zip-archive";
import Papa from "papaparse";
import { connectDatabase } from "../api/db";
export { linkedinToDatabase, printLinkedinDatabase };

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
      sql: "insert into linkedin (address, birth_date, first_name, geo_location, headline, industry, instant_messengers, last_name, maiden_name, summary, twitter_handles, websites, zip_code) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [
        data["Address"],
        data["Birth Date"],
        data["First Name"],
        data["Geo Location"],
        data["Headline"],
        data["Industry"],
        data["Instant Messengers"],
        data["Last Name"],
        data["Maiden Name"],
        data["Summary"],
        data["Twitter Handles"],
        data["Websites"],
        data["Zip Code"],
      ],
    };
    await db.execAsync([query], false);
  } catch (error) {
    console.error(error);
  }
};

const printLinkedinDatabase = async () => {
  try {
    const db = await connectDatabase();
    const query = {
      sql: "select * from linkedin",
      args: [],
    };
    const [result] = await db.execAsync([query], false);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
