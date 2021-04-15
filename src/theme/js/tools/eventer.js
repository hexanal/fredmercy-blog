const DEBUG_EVENTER = false

export const eventer = {
  subscribers: [],

  subscribe: (id, cb) => {
    eventer.addSubscriber(id, cb)
    return () => eventer.removeSubscriber(id, cb) // call to remove?
  },
  unsubscribe: (id, cb) => { eventer.removeSubscriber(id, cb) },
  dispatch: (id, payload) => eventer.dispatchToSubscribers(id, payload),

  addSubscriber: (id, cb) => {
    if ( DEBUG_EVENTER ) console.log(`[events] adding subscriber to '${id}' events`)
    eventer.subscribers.push({
      id,
      cb,
    })
  },

  removeSubscriber: (id, cb) => {
    if ( DEBUG_EVENTER ) console.log(`[events] removing subscriber from '${id}' events`)
    eventer.subscribers = eventer.subscribers.filter(sub => (sub.id !== id && sub.cb !== cb) )
  },

  dispatchToSubscribers: (eventId, payload) => {
    if ( DEBUG_EVENTER ) {
      console.group('[events] dispatch')
        console.log(`[events] dispatching payload to '${eventId}' subscribers`)
        if ( payload ) {
          console.log(`[events] with payload:`)
          console.log( payload )
        }
      console.groupEnd()
    }

    eventer.subscribers.map(({id, cb}) => {
      if (id === eventId) return cb(payload)
    })
  }
}

const eventerMiddleware = ({props}) => {
  const { subscribe, unsubscribe, dispatch } = eventer

  props.events = {
    subscribe,
    on: subscribe,
    listen: subscribe,

    unsubscribe,
    off: unsubscribe,

    dispatch,
    emit: dispatch
  }

  return props
}

export default eventerMiddleware