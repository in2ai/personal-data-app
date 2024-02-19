# Mappers

This module will contain mappers for each model of the app to each related type
used in integrations, such as backend API.

A mapper should map an external type to a model, and a model to the external type.

This module will not depend on React, so react, react-dom, react-router, etc imports are
forbidden here, and file extensions must be `.ts`.

Each model will have its own folder with the code and tests for all related mappers,
and utils related only to it when needed.
