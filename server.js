
'use strict';
var express = require('express'); // eslint-disable-line node/no-missing-require
var app = express();
var expressBrowserify = require('express-browserify'); // eslint-disable-line node/no-missing-require
var dotenv = require('dotenv');
var AuthorizationV1 = require('ibm-watson/authorization/v1');
var ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
var bodyParser = require('body-parser');
const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
};

const toneAnalyzer = new ToneAnalyzerV3({
  iam_apikey: 'WATSON_API_KEY',
  url:      'https://gateway.watsonplatform.net/tone-analyzer/api',
  version:  '2016-05-19',
});

var isDev = app.get('env') === 'development';
app.get(
  '/bundle.js',
  expressBrowserify('public/client.js', {
    watch: isDev,
    debug: isDev
  })
);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('dist/'));


app.post('/analyze', function(req, res, next) {
  const toneParams = {
    tone_input: { 'text': req.body.text },
    content_type: 'application/json',
  };
  toneAnalyzer.tone(toneParams,
    function(err, result) {
      if (err) {
        return console.log(err);
      }
      res.send(JSON.stringify(result, null, 2));
      res.end("finished request");
    }
  );
});

// optional: load environment properties from a .env file
dotenv.load({ silent: true });

// For local development, specify the username and password or set env properties
var ltAuthService = new AuthorizationV1({
  //username: process.env.TONE_ANALYZER_USERNAME || 'username',
  //password: process.env.TONE_ANALYZER_PASSWORD || 'password',
  iam_apikey: 'WATSON_API_KEY',
  url: ToneAnalyzerV3.URL,
  version:  '2016-05-19',
});

app.get('/api/token/tone_analyzer', function(req, res) {
  ltAuthService.getToken(function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port, function() {
  console.log('Watson request server running at http://localhost:%s/', port);
});





