/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Shorter from '../api/shorter/shorter.model';

Shorter.find({}).remove()
  .then(() => {
    Shorter.create({
      origin: 'http://test.url/link1',
    }, {
      origin: 'http://test.url/link2',
    }, {
      origin: 'http://test.url/link3',
    }, {
      origin: 'http://test.url/link4',
    }, {
      origin: 'http://test.url/link5',
    }, {
      origin: 'http://test.url/link6',
    });
  });
