'use strict';
// notes:
//
// * This file is bundled by exprss-browserify into bundle.js
//
// * The require('ibm-watson/language_translator/v3') could also be written as require('ibm-watson').LanguageTranslatorV3,
//   but that version results in a much larger bundle size.
//
// * Tokens expire after 1 hour. This demo simply fetches a new one for each translation rather than keeping a fresh one.
//
// * fetch() is a modern version of XMLHttpRequest. A pollyfill is available for older browsers: https://github.com/github/fetch

var btn = document.getElementById('analyze-btn');
var input = document.getElementById('input');
var output = document.getElementById('output');
var http = require("http");



 

btn.onclick = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:3000/analyze', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        output.innerHTML = (xhr.responseText);
      } else {
        output.innerHTML = JSON.stringify(xhr.statusText, null, 2);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(JSON.stringify({"text": input.value}));
};
