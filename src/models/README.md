# Models

This module will contain model interfaces for the app, a definition of all
entities used in the app domain with props related to it.

A model should be created directly in the app, through input components filled by users,
or created in a service through a mapper when a service function is called.

This module will not depend on React, so react, react-dom, react-router, etc imports are
forbidden here, and file extensions must be `.ts`.

Each main model and related models should be defined in its own file as classes to facilitate the use of automapper.
All models should be exported using named exports.
