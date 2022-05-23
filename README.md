# mp-validation-server

## Setup and Install

1. Install dependencies `npm i`
2. Copy `.env.template` to `.env` and populate it with your mParticle Data Plan API credentials and dataplan details (these can be overridded in http request)
3. Start in dev using `npm run debug` or `node app.js` 

## Usage
 * The server runs at http://localhost:3000 by default
 * Point an http client (ie Postman) at your server
 * Optionally, set http request headers `MP-DataplanVersion` & `MP-DataplanId` to override env variables
 * Send an mParticl event batch to your validation server!

## Demo
|    |   |
|-----------|---------|
| ![Usage](https://user-images.githubusercontent.com/2018204/168176786-4cec504c-92d6-4565-ba57-6d220c1ad170.gif)      |  This shows basic usage: first a valid request followed<br /> by a request that doesn't match the mParticle data plan schema  |
| ![Usage](https://user-images.githubusercontent.com/2018204/168177345-84c20d2c-68fb-4fe2-b8c9-aa9909da0399.gif)      |   This shows the ability to specify the <br /> dataplan and version in the request headers  |
