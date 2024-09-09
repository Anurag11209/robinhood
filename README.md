

## Installation - On Laptop
1. Install [Node.js](https://nodejs.org/en/)</a>
2. Install [Firebase](https://firebase.google.com/), [Material-UI](https://material-ui.com/) core & icons, [Chart.js](https://www.chartjs.org/) & its React interface, & [axios](https://github.com/axios/axios) to the node modules of the app with `npm`<br>
  Run `npm i firebase @material-ui/icons react-chartjs-2 axios`
3. Create the React app template with `npx` using robinhood-clone as name<br>
  Run `npx create-react-app robinhood-clone`<br>
4. Move to the created app folder robinhood-clone<br>
  Run `cd robinhood-clone`
5. Download this repository as a zip file
6. Extract the zip file into the robinhood-clone folder
7. Go to [Firebase](https://firebase.google.com/) & create or login to a profile
   1. Add a new project Robinhood Clone with hosting & without analytics
   2. Go to the project web configuration, copy the configuration, & paste it as the value of firebaseConfig in firebase.js
   3. Go to Firestore create a new database in test mode
   4. Create a collection myStocks
   5. Create the fields shares of type number & ticker of type str
   6. Add a document with the values 20 for shares & 'AAPL' for ticker
8. Go to [Finnhub Stock API](https://finnhub.io), create or login to a profile, create an API key, copy it, & paste it as the value of TOKEN in src/Stats.js
## Deployment - On Laptop
1. Build the project with `npm` in the folder robinhood-clone<br>
  Run `npm run build`
2. Deploy the project on Firebase<br>
  Run `firebase deploy`
## Local Execution - On Laptop
* Start the app with `npm` in the folder robinhood-clone<br>
  Run `npm start`
## Online Execution - On Laptop or Mobile
* Visit the link of the deployed version on Firebase
## Interaction - On Laptop or Mobile
* Interact with the Robinhood-like UI as in Robinhood
## Help
To ask for help with running the app, you can contact us on [Instagram](https://instagram.com/aoctut/).
## Contribution
* For suggestions or financial support to improve the app you can contact us on [Instagram](https://instagram.com/aoctut/).
* For code improvements you can fork this repository, make improvements, and submit them via a pull request.
## Credit
* [#cpfam](https://www.youtube.com/channel/UCqrILQNl5Ed9Dz6CGMyvMTQ)
#### + THANK YOU FOR BEING HERE 🙏+
