export default function stater( startValue ) {
  let value = startValue
  let callbacks = []

  const staterState = {
    get: () => value,

    set: newValue => {
      value = newValue
      callbacks.map(cb => cb(value) )
      return value
    },

    onChange: cb => {
      callbacks.push(cb)
      return staterState
    },

    update: () => {
      callbacks.map(cb => cb(value) )
      return value
    }
  }

  return staterState
}
