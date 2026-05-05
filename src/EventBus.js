class EventBus {
  constructor() {
    this.listeners = {};
  }

  // Subscribe to an event
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }
    // Sets automatically ignore duplicate function references
    this.listeners[event].add(callback);
  }

  // Broadcast an event
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}

// Create a single global instance for the whole project
const bus = new EventBus();