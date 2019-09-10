# API Version 1 Documentation

- Base route starts with : `{SERVER_ADDRESS}/api/v1`.
- all responses has a `error` property which you can check if the request was successful or not. if there isn't any issue with your request, this object will be `null`.

## User Routes:

- #### sign up:

  - uri: `/signup`
  - method: `POST`
  - body schema:
    ```javascript
    {
      "name": string, // min: 5; max: 60; required;
      "phone": string, // length:11; required;
      "password": string, // min: 6; max: 60; required;
      "referral_code": string // length: 10;
    }
    ```
  - response schema:
    ```javascript
    {
      "user": {},
      "token": string
    }
    ```
