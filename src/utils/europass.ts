import * as FileSystem from "expo-file-system";
import { connectDatabase } from "../api/db";
import { Buffer } from "buffer";
import convert from "xml-js";
export { europassToDatabase };

const europassToDatabase = async (uri) => {
  try {
    //read file as base 64
    const fileContent = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    //base 64 decode
    const decodedFileContent = Buffer.from(fileContent, "base64").toString(
      "utf-8"
    );

    //keep only xml (from '<?xml version' to 'endstream')
    const start = decodedFileContent.indexOf("<?xml version");
    if (start === -1) throw new Error("Invalid Europass file");
    const end = decodedFileContent.indexOf("endstream", start);
    if (end === -1) throw new Error("Invalid Europass file");

    //xml to json
    const xml = decodedFileContent.substring(start, end);
    const json = JSON.parse(
      JSON.stringify(convert.xml2js(xml, { compact: true }))
    );

    //save to database
    const db = await connectDatabase();
    const query = {
      sql: "insert into person (name, surname, birth_date, mother_tongue) values (?, ?, ?, ?)",
      args: [
        json["Candidate"]["CandidatePerson"]["PersonName"]["oa:GivenName"][
          "_text"
        ],
        json["Candidate"]["CandidatePerson"]["PersonName"]["hr:FamilyName"][
          "_text"
        ],
        json["Candidate"]["CandidatePerson"]["hr:BirthDate"]["_text"],
        json["Candidate"]["CandidatePerson"]["PrimaryLanguageCode"]["_text"],
      ],
    };
    const [result]: any = await db.execAsync([query], false);
    const id_person = result.insertId;
    console.log("Person inserted with id: " + id_person);
  } catch (error) {
    console.error(error);
  }
};
