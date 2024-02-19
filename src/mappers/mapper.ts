import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';

import addEuropassUserDataToUserData from './europass/europassUserData-to-userData';
import addLinkedinUserDataToUserData from './linkedIn/linkedInUserData-to-userData';

export const mapper = createMapper({
  strategyInitializer: classes(),
});

// Europass
addEuropassUserDataToUserData(mapper);

// LinkedIn
addLinkedinUserDataToUserData(mapper);
