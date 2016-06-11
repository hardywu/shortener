'use strict';

var app = require('../../../server');
import request from 'supertest';

var newShorter;

describe('Shorter API:', function() {

  describe('GET /api/shorters', function() {
    var shorters;

    beforeEach(function(done) {
      request(app)
        .get('/api/shorters')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          shorters = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(shorters).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/shorters', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/shorters')
        .send({
          origin: 'http://test.url/link'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newShorter = res.body;
          done();
        });
    });

    it('should respond with the newly created shorter', function() {
      expect(newShorter.origin).to.equal('http://test.url/link');
    });

  });

  describe('GET /api/shorters/:id', function() {
    var shorter;

    beforeEach(function(done) {
      request(app)
        .get('/api/shorters/' + newShorter._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          shorter = res.body;
          done();
        });
    });

    afterEach(function() {
      shorter = {};
    });

    it('should respond with the requested shorter', function() {
      expect(shorter.origin).to.equal('http://test.url/link');
    });

  });

  describe('PUT /api/shorters/:id', function() {
    var updatedShorter;

    beforeEach(function(done) {
      request(app)
        .put('/api/shorters/' + newShorter._id)
        .send({
          origin: 'http://updated.test.url/link'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedShorter = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedShorter = {};
    });

    it('should respond with the updated shorter', function() {
      expect(updatedShorter.origin).to.equal('http://updated.test.url/link');
    });

  });

  describe('DELETE /api/shorters/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/shorters/' + newShorter._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when shorter does not exist', function(done) {
      request(app)
        .delete('/api/shorters/' + newShorter._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
