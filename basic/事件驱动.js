const events = require('events');

const EventEmitter = new events.EventEmitter()
let sym = Symbol()

EventEmitter.on(sym, () => {
  console.log('异步事件');
})

setTimeout(function() {
  EventEmitter.emit(sym)
}, 2000);
