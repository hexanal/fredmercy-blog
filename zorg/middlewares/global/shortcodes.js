// const fs = require('fs')
// const chalk = require('chalk')
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
    processor: function({ props, item, contentTypes }) {
      return useBlockWithData('side-note', { content: marked(props) })
    }
  },
  {
    tag: 'drawer',
    processor: function({ props, item, contentTypes }) {
      const content = marked(props)

      return useBlockWithData('drawer', { content })
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
      return useBlockWithData('latest-post', { latest: contentTypes.post[0] })
    }
  },
  {
    tag: 'test',
    processor: function({ props, item, contentTypes }) {
      const params = JSON.parse(props)

      return useBlockWithData('test', params)
    }
  },
  {
    tag: 'audio',
    processor: function({ props }) {
      return useBlockWithData('audio', { src: props })
    }
  },
]

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

const applyShortcodes = function( item, contentTypes ) {
  const content = shortcodes.reduce( (accContent, shortcode) => {
    const tag = `[${shortcode.tag}](`
    const firstSplit = item.content.split( tag )
    const exploded = firstSplit.map( part => part.split(')')[0] )

    exploded.shift()

    const content = exploded.reduce( (acc, props) => {
      const replaceString = `${tag}${props})`
      const module = shortcode.processor({
        props: props.trim(),
        item,
        contentTypes,
      })

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
