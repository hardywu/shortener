# shortener

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.5.

## Getting Started

It is a simple example that how to create short urls. The idea is that we can
sign each url an auto increment sequential number in the 0-9A-Za-z base format.
The resulting short urls are just encoded integers. When an user visits a short
url, the server end of this app will look up the record from MongoDB and
redirect the user to the corresponding url.

### Demo

[Heroku](https://sortnr.herokuapp.com)

### DB Schema

There are only two Collections: Shorter and ShorterCounter.

Shorter has two uniquely indexed attributes:

* origin: the original long url
* token: the token part of the short url

ShorterCounter has only one document with only one attribute:

* seq: keep track of the count of shorters

### API

* `/api/shorters`: the standard CRUD interface. Creating the same origin urls, will
always return the same record.
* `/:token`: look up the short url in the record and redirect if found one
* `/*`: serving the static front end files

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
