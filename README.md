# mp-validation-server

## Setup and Install

1. Copy `mp.config.template.json` to `mp.config.json` and populate it with your `workspaceId`, and mParticle Dataplan credentials 
2. Copy `.env.template` to `.env` and populate it with dataplan details as desired (these can be overridded in http request)
3. Install dependencies `npm i`
4. Start in dev using `npm run debug` or `node app.js` 

## Usage
 * The server runs at http://localhost:3000 by default
 * Point an http client (ie Postman) at your server
 * Optionally, set http request headers `MP-DataplanVersion` & `MP-DataplanId` to override env variables


