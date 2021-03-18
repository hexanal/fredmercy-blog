const fs = require('fs')
const frontMatter = require('front-matter')
const marked = require('marked')
const templater = require('../../bin/templater')
const { debugLog } = require('../../bin/utils')

const useBlockWithData = function(blockId, data, extra) {
  // FIXME settings up the templating engine should be "another concern"
  // it should be possible to swap out the templating engine easily, and use whatever?
  templater.usePartials('./src/theme/views')

  const component = `{{>blocks/${blockId} data }}`;
  const template = templater.compile( component )
  const templateWithData = template({ data })
  // const yaml = split.join('\n').replace(split[0], '')
  // const templateWithData = template({ data: jsyaml.load(yaml) })

  debugLog(`templating block “${blockId}”`)

  return templateWithData
}

const SHORTCODES = [
  {
    tag: 'latest-post',
    processor: function({ props, item, contentTypes }) {
      const latest = { ...contentTypes.post[0] }
      latest.excerpt = marked( latest.excerpt )
      return useBlockWithData('latest-post', { ...item, latest })
    }
  },
  {
    tag: 'children-pages',
    processor: function({ props, item, contentTypes }) {
      return useBlockWithData('children-pages', item)
    }
  },
  {
    tag: 'include',
    processor: function({props, contentTypes}) {
      const file = fs.readFileSync(`./${props}`, 'utf8')
      const { body } = frontMatter( file.toString() )

      return getProcessedContent( body, contentTypes )
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
  if (!item.body) return item

  return {
    ...item,
    body: getProcessedContent( item.body, contentTypes )
  }
}

const getProcessedContent = function( content, contentTypes ) {
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
        contentTypes,
      })

      if (!shortcoded) return acc

      const module = shortcoded
        .replace('\n', '')
        .replace('\r', '')

      debugLog(`processing shortcode “${shortcode.tag}”`)

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
