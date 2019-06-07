# youtube-comment-tone-analyzer

An Angular-NodeJS-Express application that communicates with the Youtube-Data and Watone-Tone-Analyzer APIs.
Navigate to a comment section by pressing a video result from the search bar, and toggle the switch next to a comment
to display the emotional analysis of that comment. 

Parts of this project were derived from the [ngx-YouTube-Player](https://github.com/SamirHodzic/ngx-youtube-player).
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Credentials 

Youtube API-key can be specified in the youtube.service.ts file.
The Tone-Analyzer API-key is specified in server.js. 
env variables can be used for deploying locally. 

## Routes

XMLHttpRequest route in watson.service.ts needs to be edited when running locally like so:
`xhr.open("POST", 'http://localhost:8080/analyze', true);`

## NodeJS server

server.js calls the Watson Tone-Analyzer API. This can be run with `node server.js` 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
