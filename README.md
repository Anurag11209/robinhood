<h1 align="center">+ Robinhood Clone v2020-11 +</h1>
<p align="center">
<h3 align='center'>Displays part of the <a href="https://robinhood.com/us/en/">Robinhood</a> UI with similar functionality</h3>
</p>
  <p align="center">⭐️ & 🔱</p>
  <p align="center">
    <a href="https://github.com/lxndroc">
      <img src="https://img.shields.io/badge/Coded%20By-@lxndroc-yellow" />
    </a>
    <img src="https://img.shields.io/badge/Version-2020--11-yellow" />
    <a href="https://opensource.org/licenses/BSD-3-Clause">
      <img src="https://img.shields.io/badge/Licence-BSD 3--Clause-yellow" />
    </a>
    <a href="https://instagram.com/aoctut/">
      <img src="https://img.shields.io/badge/Contact-@aoctut-yellow" />
    </a>
  </p>
  <p align="center">
    <a href="https://reactjs.org/">
      <img src="https://img.shields.io/badge/Built%20with-React-yellow" />
    </a>
    <img src="https://img.shields.io/badge/Architecture-Functional Components-yellow" />
    <a href="https://www.javascript.com/">
      <img src="https://img.shields.io/badge/Built%20with-JavaScript-yellow" />
    </a>
    <img src="https://img.shields.io/badge/Built%20with-CSS3-yellow" />
    <img src="https://img.shields.io/badge/Built%20with-HTML5-yellow" />
  </p>
  <p align="center">
    <a href="https://firebase.google.com/">
      <img src="https://img.shields.io/badge/Powered%20by-Firebase-yellow" />
    </a>
    <a href="https://finnhub.io/">
      <img src="https://img.shields.io/badge/Powered%20by-Finnhub Stock API-yellow" />
    </a>
    <a href="https://material-ui.com/">
      <img src="https://img.shields.io/badge/Powered%20by-Material UI-yellow" />
    </a>
    <a href="https://www.chartjs.org/">
      <img src="https://img.shields.io/badge/Powered%20by-Chart.js-yellow" />
    </a>
    <a href="https://github.com/axios/axios/">
      <img src="https://img.shields.io/badge/Powered%20by-axios-yellow" />
    </a>
    <img src="https://img.shields.io/badge/Runs%20on-Web-yellow" />
  </p>

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
