# IR

This repository contains all the code used for implementing the form signing and contact form features for IR.

## Components

### next-js-site

The `next-js-site` directory contains a next.js web app that serves the UI for both functionalities. This site is deployed to netlify automatically whenever there are changes committed to the main branch.

#### Required Setup

To get the site up and running on your local machine, you will need to set the some environment variables. Create a file named `.env.local` in the `next-js-site` directory and add the variables below with their respective values.

```
TITAN_EMAIL="<titan-email-address>"
TITAN_PASSWORD="<titan-email-password>"
RECIPIENT_EMAIL="<your-email-here>"

GOOGLE_SERVICE_PRIVATE_KEY=<private-key>
GOOGLE_CLIENT_EMAIL=<service-account-email>
SPREADSHEET_ID=<google-spreadsheet-id-from-url>
```

### gcloud-functions

The `gcloud-functions` directory contains the google cloud function that is used to generate the pdf of the signed agreement. The next.js site uses sends this function the form contents and this function generates and returns the pdf.

To deploy the function, use the following command:

```bash
gcloud functions deploy helloHttp --runtime nodejs18 --trigger-http --allow-unauthenticated
```
