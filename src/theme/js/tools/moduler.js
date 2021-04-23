const moduler = {

  mount: function ( root ) {
    const elementsWithComponent = root.querySelectorAll(`[data-component]`)

    elementsWithComponent.forEach( element => {
      const { component } = element.dataset
      const all = component.split(',')
      all.map( module => {
        this.mountComponentElement( element, module.trim() )
      })
    })
  },

  mountComponentElement: function( element, component ) {
    const children = {}

    element.querySelectorAll('[data-child]').forEach( child => {
      children[ child.dataset.child ] = child
    })

    const defaultProps = { element, children }
    const props = this.withMiddlewares( defaultProps )

    import(`../components/${ component }.mjs`)
      .then( m => m.default( props ) )
  },

  /**
   * middleware business!
   */
  middlewares: {},

  use: function( middlewares ) {
    this.middlewares = middlewares
    return this
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
