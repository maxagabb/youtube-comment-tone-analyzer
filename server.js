
'use strict';
var express = require('express'); // eslint-disable-line node/no-missing-require
var app = express();
var dotenv = require('dotenv');
var AuthorizationV1 = require('ibm-watson/authorization/v1');
var ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
var bodyParser = require('body-parser');
const cors = require('cors');
// optional: load environment properties from a .env file
dotenv.load({ silent: true });

var corsOptions = {
  origin: 'https://youtube-tone-analyzer.herokuapp.com',
  optionsSuccessStatus: 200 
};

const toneAnalyzer = new ToneAnalyzerV3({
  iam_apikey: process.env.WATSON_KEY,
  url:      'https://gateway.watsonplatform.net/tone-analyzer/api',
  version:  '2016-05-19',
});

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('dist/'));

app.get('*', function (req, res) {
  res.sendfile('./dist/index.html');
});
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

var port = process.env.PORT || process.env.VCAP_APP_PORT || 8080;
app.listen(port, function() {
  console.log('Watson request server running at http://localhost:%s/', port);
});





