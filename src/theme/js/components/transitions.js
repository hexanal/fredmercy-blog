import moduler from '../tools/moduler.js'

const GLOBAL = {
  index: 0,
  history: [],
  moduler
}

export default function() {
  const leave = ({current, trigger})=> {
    GLOBAL.moduler.kill( current.container )
  }

  const enter = ({next}) => {
    GLOBAL.index++
    GLOBAL.history.push( next.url.href )
    GLOBAL.moduler.mount( next.container )

    return Promise.resolve()
  }

  // const afterEnter = ({next}) => { }

  const liftoff = barba => {
    barba.default.init({
      debug: true,
      prevent: ({ el }) => el.dataset && el.dataset.transition === 'none',
      transitions: [
        {
          name: 'self',
          enter() {
            console.log('self transition')
          },
        },
        {
          name: 'base',
          leave,
          enter,
          // afterEnter,
        }
      ]
    })
  };

  import('../tools/barba.mjs')
    .then(liftoff)
    .catch(err => {
      console.error(err.message)
    })
}
