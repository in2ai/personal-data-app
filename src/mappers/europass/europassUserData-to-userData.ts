import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { EuropassUserData } from '../../services/europass/EuropassUserData';
import { UserData } from '../../models/userData';

const addEuropassUserDataToUserData = (mapper: Mapper) => {
  createMap(
    mapper,
    EuropassUserData,
    UserData,
    forMember(
      (destination) => destination.firstName,
      mapFrom(
        (source) => source['Candidate']['CandidatePerson']['PersonName']['oa:GivenName']['_text']
      )
    ),
    forMember(
      (destination) => destination.lastName,
      mapFrom(
        (source) => source['Candidate']['CandidatePerson']['PersonName']['hr:FamilyName']['_text']
      )
    ),
    forMember(
      (destination) => destination.birthDate,
      mapFrom((source) => source['Candidate']['CandidatePerson']['hr:BirthDate']['_text'])
    ),
    forMember(
      (destination) => destination.motherTongue,
      mapFrom((source) => source['Candidate']['CandidatePerson']['PrimaryLanguageCode']['_text'])
    )
  );
};

export default addEuropassUserDataToUserData;
