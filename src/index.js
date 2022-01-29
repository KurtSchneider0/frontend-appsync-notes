import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'eu-central-1',
        userPoolId: process.env.USERPOOLID,
        userPoolWebClientId: process.env.USERPOOLWEBCLIENTID,
        mandatorySignIn: false,
    }
});

const myAppConfig = {
  'aws_appsync_graphqlEndpoint': process.env.AWS_APPSYNC_GRAPHQLENDPOINT,
  'aws_appsync_region': 'eu-central-1',
  'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
}

Amplify.configure(myAppConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
