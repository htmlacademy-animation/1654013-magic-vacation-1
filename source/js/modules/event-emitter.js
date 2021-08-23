export default class EventEmitter {
  constructor() {
    this.events = [];
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  off(event, callback) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter(function (eventCallback) {
      return callback !== eventCallback;
    });
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    this.events[event].forEach(function (callback) {
      callback.call(null, ...args);
    });
  }
}
