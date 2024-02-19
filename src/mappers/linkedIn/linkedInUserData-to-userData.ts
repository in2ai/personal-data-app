import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { UserData } from '../../models/userData';
import { LinkedinUserData } from '../../services/linkedIn/LinkedInUserData';

const addLinkedinUserDataToUserData = (mapper: Mapper) => {
  createMap(
    mapper,
    LinkedinUserData,
    UserData,
    forMember(
      (destination) => destination.firstName,
      mapFrom((source) => source.Profile[0]['First Name'])
    ),
    forMember(
      (destination) => destination.lastName,
      mapFrom((source) => source.Profile[0]['Last Name'])
    ),
    forMember(
      (destination) => destination.address,
      mapFrom((source) => source.Profile[0]['address'])
    ),
    forMember(
      (destination) => destination.birthDate,
      mapFrom((source) => source.Profile[0]['Birth Date'])
    ),
    forMember(
      (destination) => destination.headline,
      mapFrom((source) => source.Profile[0]['Headline'])
    ),
    forMember(
      (destination) => destination.summary,
      mapFrom((source) => source.Profile[0]['Summary'])
    ),
    forMember(
      (destination) => destination.industry,
      mapFrom((source) => source.Profile[0]['Industry'])
    ),
    forMember(
      (destination) => destination.zipCode,
      mapFrom((source) => source.Profile[0]['Zip Code'])
    ),
    forMember(
      (destination) => destination.geoLocation,
      mapFrom((source) => source.Profile[0]['Geo Location'])
    ),
    forMember(
      (destination) => destination.twitterHandles,
      mapFrom((source) => source.Profile[0]['Twitter Handles'])
    ),
    forMember(
      (destination) => destination.websites,
      mapFrom((source) => source.Profile[0].Websites)
    ),
    forMember(
      (destination) => destination.instantMessengers,
      mapFrom((source) => source.Profile[0]['Instant Messengers'])
    ),
    forMember(
      (destination) => destination.experiences,
      mapFrom((source) =>
        source.Positions.map((position) => ({
          companyName: position['Company Name'],
          title: position.Title,
          description: position.Description,
          location: position.Location,
          startedOn: position['Started On'],
          finishedOn: position['Finished On'],
        }))
      )
    ),
    forMember(
      (destination) => destination.skills,
      mapFrom((source) =>
        source.Skills.map((skill) => ({
          value: skill.Name,
        }))
      )
    )
  );
};

export default addLinkedinUserDataToUserData;
