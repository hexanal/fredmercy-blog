/**
 * * if you don't want to use the middleware to augment all the component, use
 * * the Messaging object as an independent tool
 *
 * todo: find a way to improve the data flow somewhat?
 *
 */
export const Messaging = {
  subscribers: [],

  subscribe: (id, cb) => {
    Messaging.addSubscriber(id, cb);
    return () => Messaging.removeSubscriber(id, cb); // call to remove?
  },
  unsubscribe: (id, cb) => { Messaging.removeSubscriber(id, cb); },
  dispatch: (event) => Messaging.dispatchToSubscribers(event),

  addSubscriber: (id, cb) => {
    Messaging.subscribers.push({
      id,
      cb,
    })
  },

  removeSubscriber: (id, cb) => {
    Messaging.subscribers = Messaging.subscribers.filter(sub => (sub.id !== id && sub.cb !== cb) );
  },

  dispatchToSubscribers: (event) => {
    const eventId = event.id;
    const payload = event.payload;

    Messaging.subscribers.map(({id, cb}) => {
      if (id === eventId) return cb(payload);
    });
  }
};

const MessagingMiddleware = ({props}) => {
  const { subscribe, unsubscribe, dispatch } = Messaging;

  props.messaging = {
    subscribe,
    unsubscribe,
    dispatch,
  };

  return props;
}

export default MessagingMiddleware;