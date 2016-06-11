/**
 * Shorter model events
 */

'use strict';

import {EventEmitter} from 'events';
import Shorter from './shorter.model';
var ShorterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ShorterEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Shorter.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ShorterEvents.emit(event + ':' + doc._id, doc);
    ShorterEvents.emit(event, doc);
  }
}

export default ShorterEvents;
