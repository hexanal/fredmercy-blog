const moduler = {
  mount: function ( root ) {
    const elementsWithModule = root.querySelectorAll(`[data-component]`)

    elementsWithModule.forEach( element => {
      const { component } = element.dataset

      component
        .split(',')
        .map( module => this.mountModuleOnElement( element, module.trim() ) )
    })
  },

  mountModuleOnElement: function( element, moduleId ) {
    const children = {}

    element
      .querySelectorAll('[data-child]')
      .forEach( child => children[ child.dataset.child ] = child )

    import(`../components/${ moduleId }.js`)
      .then( m => m.default({ element, children }) )
  }
}

export default moduler
