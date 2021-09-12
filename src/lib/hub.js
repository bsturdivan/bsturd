export default (function () {
  const listeners = {}
  const history = {}

  return {
    sub: ({ name }, callback, late) => {
      // If this subscription specifies `late` binding, we look through the history
      // and fire the callback for all previous instances of the event.
      if (late && history[name]) {
        history[name].forEach((data) => callback(name, data))
      }

      listeners[name] ||= []
      listeners[name].push(callback)
    },

    pub: ({ name }, data = {}) => {
      if (history[name]) {
        history[name].push(data)
      } else {
        history[name] = [data]
      }

      listeners[name]?.forEach((listener) => listener(name, data))
    },

    unsub: ({ name }, callback) => {
      listeners[name] = listeners[name]?.filter(
        (listener) => callback !== listener,
      )
    },
  }
})()
