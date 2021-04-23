const moduler = {

  // mounted: [],
  middlewares: {},

  use: function( middlewares ) {
    this.middlewares = middlewares
    return this
  },

  mount: function ( root ) {
    const elementsWithComponent = root.querySelectorAll(`[data-component]`)

    elementsWithComponent.forEach( element => {
      const { component } = element.dataset
      const children = {}

      element.querySelectorAll('[data-child]').forEach( child => {
        children[ child.dataset.child ] = child
      })

      const defaultProps = { element, children }
      const props = this.withMiddlewares( defaultProps )

      const module = import(`../components/${ component }.mjs`)
        .then( m => {
          m.default( props )
        })
    })
  },

  withMiddlewares: function( props ) {
    return Object
      .keys( this.middlewares )
      .reduce( (acc, middlewareName) => ({
        ...acc,
        [middlewareName]: this.middlewares[middlewareName]( props )
      }), props)
  }

}

export default moduler
