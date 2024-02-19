class EuropassUserDataDeclaration {
  _attributes: {
    version: string;
    encoding: string;
    standalone: string;
  };
}

class EuropassUserDataAttributes {
  'xsi:schemaLocation': string;
  'xmlns': string;
  'xmlns:oa': string;
  'xmlns:eures': string;
  'xmlns:hr': string;
  'xmlns:xsi': string;
}

class EuropassUserDataHeaderDocumentID {
  '_attributes': {
    schemeID: string;
    schemeName: string;
    schemeAgencyName: string;
    schemeVersionID: string;
  };
}

class EuropassUserDataCandidateSupplier {
  'hr:PartyID': {
    _attributes: {
      schemeID: string;
      schemeName: string;
      schemeAgencyName: string;
      schemeVersionID: string;
    };
  };
  'hr:PartyName': { _text: string };
  'PersonContact': {
    PersonName: {
      'oa:GivenName': { _text: string };
      'hr:FamilyName': { _text: string };
    };
    Communication: {
      ChannelCode: { _text: string };
      'oa:URI': { _text: string };
    };
  };
  'hr:PrecedenceCode': { _text: string };
}

class EuropassUserDataCandidatePerson {
  'PersonName': {
    'oa:GivenName': { _text: string };
    'hr:FamilyName': { _text: string };
  };

  'Communication': [
    {
      ChannelCode: { _text: string };
      'oa:URI': { _text: string };
    },
    {
      ChannelCode: { _text: string };
      UseCode: { _text: string };
      CountryDialing: { _text: string };
      'oa:DialNumber': { _text: string };
      CountryCode: { _text: string };
    },
    {
      UseCode: { _text: string };
      Address: {
        _attributes: { type: string };
        'oa:AddressLine': { _text: string };
        'oa:CityName': { _text: string };
        CountryCode: { _text: string };
        'oa:PostalCode': { _text: string };
      };
    },
  ];
  'NationalityCode': { _text: string };
  'hr:BirthDate': { _text: string };
  'GenderCode': { _text: string };
  'PrimaryLanguageCode': { _attributes: { name: string }; _text: string };
}

class EuropassUserDataCandidateProfile {}

class EuropassUserDataCandidate {
  _attributes: EuropassUserDataAttributes;
  'hr:DocumentID': EuropassUserDataHeaderDocumentID;
  'CandidateSupplier': EuropassUserDataCandidateSupplier;
  CandidatePerson: EuropassUserDataCandidatePerson;
  CandidateProfile: EuropassUserDataCandidateProfile;
}

export class EuropassUserData {
  _attributes: EuropassUserDataDeclaration;
  Candidate: EuropassUserDataCandidate;
}
