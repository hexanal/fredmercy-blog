// const fs = require('fs')
const marked = require('marked')
const templater = require('../../bin/templater')
const { debugLog } = require('../../bin/utils')

const useBlockWithData = function(blockId, data) {
  const component = `{{>blocks/${blockId} data }}`;
  const template = templater.compile( component )
  const templateWithData = template({ data })
  // const yaml = split.join('\n').replace(split[0], '')
  // const templateWithData = template({ data: jsyaml.load(yaml) })

  debugLog(`templating block “${blockId}”`)

  return templateWithData
}

const shortcodes = [
  {
    tag: '*',
    processor: function({ props, item, contentTypes }) {
      return useBlockWithData('side-note', { content: marked( props ) })
    }
  },
  {
    tag: 'children-pages',
    processor: function({ props, item, contentTypes }) {
      return useBlockWithData('children-pages', item)
    }
  },
  {
    tag: 'latest-post',
    processor: function({ props, item, contentTypes }) {
      if ( !contentTypes.post ) return '' // no latest post
      return useBlockWithData('latest-post', { latest: contentTypes.post[0] })
    }
  },
  {
    tag: 'external',
    processor: function({ props }) {
      try {

        const params = JSON.parse(props)
        return useBlockWithData('external-link', params)

      } catch(err) {

        console.log('Error with these props:', props)
        console.log( err )
        return ''

      }
    }
  },
  {
    tag: 'audio',
    processor: function({ props }) {
      return useBlockWithData('audio', { src: props })
    }
  },
]

const applyShortcodes = function( item, contentTypes ) {
  const content = shortcodes.reduce( (accContent, shortcode) => {
    const tag = `[${shortcode.tag}](`
    const firstSplit = item.content.split( tag )
    const exploded = firstSplit.map( part => part.split(')')[0] )

    exploded.shift()

    if ( !exploded.length ) return accContent // no shortcode

    const content = exploded.reduce( (acc, props) => {
      const replaceString = `${tag}${props})`
      const module = shortcode.processor({
        props: props.trim(),
        item,
        contentTypes,
      })
        .replace('\n', '')
        .replace('\r', '')

      debugLog(`processing shortcode “${shortcode.tag}” (in page: “${item.meta.title}”)`)

      return acc.replace(replaceString, module)
    }, accContent)

    return content
  }, item.content)

  return {
    ...item,
    content
  }
}

const addShortcodes = function( contentTypes ) {
  const withShortcodes = {}
  const types = Object.keys( contentTypes )
  templater.usePartials('./src/components')

  types.map( type => {
    withShortcodes[type] = contentTypes[type].map( item => {
      return applyShortcodes( item, contentTypes ) // passing along the whole data array
    })
  });

  return withShortcodes
}

module.exports = addShortcodes
