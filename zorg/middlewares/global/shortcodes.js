const fs = require('fs')
const chalk = require('chalk')
const marked = require('marked')
const templater = require('../../helpers/templater')

const useBlockWithData = function(blockId, data) {
  const component = `{{>blocks/${blockId} data }}`;
  const template = templater.compile( component )
  const templateWithData = template({ data })
  // const yaml = split.join('\n').replace(split[0], '')
  // const templateWithData = template({ data: jsyaml.load(yaml) })

  return templateWithData
}

const shortcodes = [
  {
    tag: '*',
    processor: function(props, item) {
      // const content = marked(props)

      return useBlockWithData('side-note', { content: props })
    }
  },
  {
    tag: 'drawer',
    processor: function(props, item) {
      // const json = JSON.parse(props)
      const content = marked(props)

      return useBlockWithData('drawer', { content })
    }
  },
  {
    tag: 'children-pages',
    processor: function(props, item) {
      return useBlockWithData('children-pages', item)
    }
  },
  {
    tag: 'test',
    processor: function(props, item) {
      const params = JSON.parse(props)

      return useBlockWithData('test', params)
    }
  },
  {
    tag: 'audio',
    processor: function(src, item) {
      return useBlockWithData('audio', { src })
    }
  },
]

const addShortcodes = function( contentTypes ) {
  const withShortcodes = {}
  const types = Object.keys( contentTypes )
  templater.usePartials('./src/components')

  types.map( type => {
    withShortcodes[type] = contentTypes[type].map( item => {
      return applyShortcodes( item )
    })
  });

  return withShortcodes
}

const applyShortcodes = function( item ) {
  const content = shortcodes.reduce( (accContent, shortcode) => {
    const tag = `[${shortcode.tag}](`
    const firstSplit = item.content.split( tag )
    const exploded = firstSplit.map( part => part.split(')')[0] )

    exploded.shift()

    const content = exploded.reduce( (acc, props) => {
      const replaceString = `${tag}${props})`
      const module = shortcode.processor( props.trim(), item )

      return acc.replace(replaceString, module)
    }, accContent)

    return content
  }, item.content)

  return {
    ...item,
    content
  }
}

module.exports = addShortcodes
