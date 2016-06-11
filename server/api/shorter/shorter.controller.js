/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shorters              ->  index
 * POST    /api/shorters              ->  create
 * GET     /api/shorters/:id          ->  show
 * PUT     /api/shorters/:id          ->  update
 * DELETE  /api/shorters/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Shorter from './shorter.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Shorters
export function index(req, res) {
  return Shorter.find().sort({ createdAt: -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Shorter from the DB
export function show(req, res) {
  return Shorter.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Shorter in the DB
export function create(req, res) {
  return Shorter.findOneAndUpdate(
      { origin: req.body.origin },
      { $setOnInsert: { origin: req.body.origin } },
      { new: true, upsert: true }
    )
    .exec()
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Shorter in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Shorter.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Shorter from the DB
export function destroy(req, res) {
  return Shorter.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
