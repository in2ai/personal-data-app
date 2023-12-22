import * as FileSystem from "expo-file-system";
import { connectDatabase } from "../api/db";
export { europassToDatabase, printEuropassDatabase };
import { Buffer } from "buffer";
import convert from "xml-js";

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
      JSON.stringify(convert.xml2js(xml, { compact: true, spaces: 4 }))
    );

    //STRUCTURE:
    /*
STRUCTURE: {
"Candidate": {
    "CandidatePerson": {
      "PersonName": {
        "oa:GivenName": {
          "_text": "Adrian"
        },
        "hr:FamilyName": {
          "_text": "Ortega Rodriguez"
        }
      },
      "Communication": [
        {
          "ChannelCode": {
            "_text": "Email"
          },
          "oa:URI": {
            "_text": "adri1pawn@gmail.com"
          }
        },
        {
          "ChannelCode": {
            "_text": "Telephone"
          },
          "UseCode": {
            "_text": "mobile"
          },
          "CountryDialing": {
            "_text": "34"
          },
          "oa:DialNumber": {
            "_text": "611021517"
          },
          "CountryCode": {
            "_text": "es"
          }
        },
        {
          "UseCode": {
            "_text": "home"
          },
          "Address": {
            "_attributes": {
              "type": "home"
            },
            "oa:AddressLine": {
              "_text": "Calle Barranco de Las Monjas, 38, 2"
            },
            "oa:CityName": {
              "_text": "Motril"
            },
            "CountryCode": {
              "_text": "es"
            },
            "oa:PostalCode": {
              "_text": "18600"
            }
          }
        }
      ],
      "NationalityCode": {
        "_text": "es"
      },
      "hr:BirthDate": {
        "_text": "1998-03-29"
      },
      "GenderCode": {
        "_text": "male"
      },
      "PrimaryLanguageCode": {
        "_attributes": {
          "name": "FREE_TEXT"
        },
        "_text": "Español"
      }
    },
    "CandidateProfile": {
      "_attributes": {
        "languageCode": "es"
      },
      "hr:ID": {
        "_attributes": {
          "schemeID": "Test-0001",
          "schemeName": "CandidateProfileID",
          "schemeAgencyName": "EUROPASS",
          "schemeVersionID": "1.0"
        }
      },
      "EmploymentHistory": {
        "EmployerHistory": {
          "hr:OrganizationName": {
            "_text": "In2AI"
          },
          "OrganizationContact": {
            "Communication": {
              "Address": {
                "oa:CityName": {
                  "_text": "Madrid"
                },
                "CountryCode": {
                  "_text": "es"
                }
              }
            }
          },
          "PositionHistory": {
            "PositionTitle": {
              "_attributes": {
                "typeCode": "FREETEXT"
              },
              "_text": "Developer In2AI"
            },
            "eures:EmploymentPeriod": {
              "eures:StartDate": {
                "hr:FormattedDateTime": {
                  "_text": "2022-01-01"
                }
              },
              "hr:CurrentIndicator": {
                "_text": "true"
              }
            },
            "City": {
              "_text": "Madrid"
            },
            "Country": {
              "_text": "es"
            }
          }
        }
      },
      "EducationHistory": {
        "EducationOrganizationAttendance": {
          "hr:OrganizationName": {
            "_text": "IES Zaidin Vergeles"
          },
          "OrganizationContact": {
            "Communication": [
              {
                "Address": {
                  "oa:CityName": {
                    "_text": "Granada"
                  },
                  "CountryCode": {
                    "_text": "es"
                  }
                }
              },
              {
                "ChannelCode": {
                  "_text": "Web"
                },
                "oa:URI": {
                  "_text": "https://www.ieszaidinvergeles.org"
                }
              }
            ]
          },
          "AttendancePeriod": {
            "StartDate": {
              "hr:FormattedDateTime": {
                "_text": "2019-01-01"
              }
            },
            "EndDate": {
              "hr:FormattedDateTime": {
                "_text": "2022-01-01"
              }
            },
            "Ongoing": {
              "_text": "false"
            }
          },
          "EducationDegree": {
            "hr:DegreeName": {
              "_text": "Desarrollador de Aplicaciones Multiplataforma"
            }
          }
        }
      },
      "eures:Licenses": {},
      "Certifications": {},
      "PublicationHistory": {},
      "PersonQualifications": {},
      "EmploymentReferences": {},
      "CreativeWorks": {},
      "Projects": {},
      "SocialAndPoliticalActivities": {},
      "CommunicationAndInterpersonalSkills": {},
      "DigitalSkills": {
        "DigitalSkillsGroup": {}
      },
      "NetworksAndMemberships": {},
      "ConferencesAndSeminars": {},
      "VoluntaryWorks": {}
    }
}
}
    */

    //save to database
    const db = await connectDatabase();
    const query = {
      sql: "insert into europass (address, birth_date, first_name, geo_location, headline, industry, instant_messengers, last_name, maiden_name, summary, twitter_handles, websites, zip_code) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [
        json["Candidate"]["CandidatePerson"]["Communication"][2]["Address"][
          "oa:AddressLine"
        ]["_text"],
        json["Candidate"]["CandidatePerson"]["hr:BirthDate"]["_text"],
        json["Candidate"]["CandidatePerson"]["PersonName"]["oa:GivenName"][
          "_text"
        ],
        json["Candidate"]["CandidatePerson"]["Communication"][2]["Address"][
          "oa:CityName"
        ]["_text"],
        null,
        null,
        null,
        json["Candidate"]["CandidatePerson"]["PersonName"]["hr:FamilyName"][
          "_text"
        ],
        null,
        null,
        null,
        null,
        json["Candidate"]["CandidatePerson"]["Communication"][2]["Address"][
          "oa:PostalCode"
        ]["_text"],
      ],
    };
    await db.execAsync([query], false);
  } catch (error) {
    console.error(error);
  }
};

const printEuropassDatabase = async () => {
  try {
    const db = await connectDatabase();
    const query = {
      sql: "select * from europass",
      args: [],
    };
    const [result] = await db.execAsync([query], false);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
