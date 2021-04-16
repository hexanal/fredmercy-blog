const fs = require('fs')
const marked = require('marked')
const jsyaml = require('js-yaml')
const templater = require('../../lib/templater') // FIXME swap templater to.. something else?
const frontMatter = require('../../lib/frontmatter') // FIXME make sure this is clean

const useBlockWithData = function(blockId, data) {
  // FIXME settings up the templating engine should be "another concern"
  // it should be possible to swap out the templating engine easily, and use whatever?
  templater.usePartials('./src/theme/views')

  const component = `{{>${blockId} }}`;
  const template = templater.compile( component )
  const templateWithData = template( data )

  return templateWithData
}

// FIXME  all of this is HIGHLY EXPERIMENTAL
const SHORTCODES = [
  {
    tag: 'block',
    processor: function({ props, item }) {
      const data = jsyaml.load( props )
      return useBlockWithData( data.component, { ...item, ...data } )
    }
  },
  {
    tag: 'latest-post',
    processor: function({ props, item, contentTypes }) {
      const latest = { ...contentTypes.post[0] }
      // console.log( item )
      return useBlockWithData('blocks/latest-post', { ...item, latest })
    }
  },
  {
    tag: 'children-pages',
    processor: function({ props, item, contentTypes }) {
      return useBlockWithData('blocks/children-pages', item)
    }
  },
  {
    tag: 'include',
    processor: function({props, item, contentTypes}) {
      const file = fs.readFileSync(`./${props}`, 'utf8')
      const { body } = frontMatter( file.toString() )

      return getProcessedContent( body, item, contentTypes )
    }
  },
  {
    tag: 'external',
    processor: function({ props }) {
      try {
        const params = JSON.parse(props)
        return useBlockWithData('blocks/external-link', params)
      } catch(err) {
        console.log('Error with these props:', props)
        console.log( err )
        return ''
      }
    }
  }
]

const applyShortcodes = function( item, contentTypes ) {
  if (!item.body) return item

  return {
    ...item,
    body: getProcessedContent( item.body, item, contentTypes )
  }
}

const getProcessedContent = function( content, item, contentTypes ) {
  return SHORTCODES.reduce( (accContent, shortcode) => {
    const tag = `[${shortcode.tag}](`
    const firstSplit = content.split( tag )
    const splits = firstSplit.map( part => part.split(')')[0] )

    splits.shift()

    if ( !splits.length ) return accContent // no shortcode found

    return splits.reduce( (acc, props) => {
      const replaceString = `${tag}${props})`
      const shortcoded = shortcode.processor({
        props: props.trim(),
        item,
        contentTypes,
      })

      if (!shortcoded) return acc

      const module = shortcoded
        .replace('\n', '')
        .replace('\r', '')

      return acc.replace(replaceString, module)
    }, accContent)
  }, content)
}

const addShortcodes = function( contentTypes ) {
  const withShortcodes = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
    withShortcodes[type] = contentTypes[type].map( item => {
      return applyShortcodes( item, contentTypes ) // passing along the whole data array
    })
  });

  return withShortcodes
}

module.exports = addShortcodes
