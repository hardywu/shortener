/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import Shorter from './api/shorter/shorter.model';

export default function(app) {
  // Insert routes below
  app.use('/api/shorters', require('./api/shorter'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/:token([0-9A-Za-z][0-9A-Za-z][0-9A-Za-z][0-9A-Za-z][0-9A-Za-z])$')
    .get((req, res) => {
      return Shorter.findOne({ token: req.params.token }).exec()
        .then((doc) => {
          if (doc) {
            return res.redirect(doc.origin);
          } else {
            return errors[404](req, res)
          }
        })
        .catch(() => (errors[404](req, res)));
     });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
