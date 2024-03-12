# Services

This module will contain services (sometimes called repositories) for the app,
to integrate the app with other systems like the backend API.

A service should use models as inputs and outputs, and use mappers to map between
app models and external system types. This layer will isolate app code of external
changes on I/O data types.

This module will not depend on React, so react, react-dom, react-router, etc imports are
forbidden here, and file extensions must be `.ts`.

Each service will have its own folder with the code and tests for the service, and utils related only to it when needed.
